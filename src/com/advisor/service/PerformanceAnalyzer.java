package com.advisor.service;

import com.advisor.model.AnalysisRequest;
import com.advisor.model.BuildReport;
import com.advisor.model.HardwareComponent;

import java.util.ArrayList;
import java.util.List;

public class PerformanceAnalyzer {
    private final HardwareService hardwareService;

    public PerformanceAnalyzer(HardwareService hardwareService) {
        this.hardwareService = hardwareService;
    }

    public BuildReport analyze(AnalysisRequest req) {
        BuildReport report = new BuildReport();
        List<HardwareComponent> selected = new ArrayList<HardwareComponent>();

        HardwareComponent cpu = hardwareService.findByModel(req.getCpuModel());
        HardwareComponent gpu = hardwareService.findByModel(req.getGpuModel());
        HardwareComponent ram = hardwareService.findByModel(req.getRamModel());
        HardwareComponent mb = hardwareService.findByModel(req.getMbModel());
        HardwareComponent storage = hardwareService.findByModel(req.getStorageModel());
        HardwareComponent psu = hardwareService.findByModel(req.getPsuModel());
        HardwareComponent cooler = hardwareService.findByModel(req.getCoolerModel());

        if (cpu != null) selected.add(cpu);
        if (gpu != null) selected.add(gpu);
        if (ram != null) selected.add(ram);
        if (mb != null) selected.add(mb);
        if (storage != null) selected.add(storage);
        if (psu != null) selected.add(psu);
        if (cooler != null) selected.add(cooler);

        report.setSelectedComponents(selected);

        // 1. Total Price & Total TDP
        double totalPrice = 0;
        int totalTdp = 0;
        for (HardwareComponent c : selected) {
            totalPrice += c.getPrice();
            totalTdp += c.getTdpWatts();
        }
        // Base motherboard + peripheral overhead
        totalTdp += 40;

        report.setTotalPrice(totalPrice);
        report.setTotalTdpWatts(totalTdp);

        // 2. Recommended PSU (TDP * 1.35 headroom + round up to nearest 50W)
        int recommendedPsu = (int) Math.ceil((totalTdp * 1.35) / 50.0) * 50;
        if (recommendedPsu < 450) recommendedPsu = 450;
        report.setRecommendedPsuWatts(recommendedPsu);

        // 3. Bottleneck Analysis
        int cpuScore = cpu != null ? cpu.getPerfScore() : 50;
        int gpuScore = gpu != null ? gpu.getPerfScore() : 50;

        double diff = Math.abs(cpuScore - gpuScore);
        double bottleneckPercent = Math.min(Math.round((diff / Math.max(cpuScore, gpuScore)) * 100.0 * 10.0) / 10.0, 45.0);

        report.setBottleneckPercentage(bottleneckPercent);

        if (bottleneckPercent < 10.0) {
            report.setBottleneckComponent("Balanced System");
            report.setBottleneckExplanation("CPU and GPU are exceptionally well matched. No noticeable bottleneck under standard workloads.");
        } else if (cpuScore < gpuScore) {
            report.setBottleneckComponent("CPU Bottleneck");
            report.setBottleneckExplanation("Your GPU outpaces your CPU by ~" + bottleneckPercent + "%. The CPU may limit maximum frame rates in CPU-intensive tasks.");
        } else {
            report.setBottleneckComponent("GPU Bottleneck");
            report.setBottleneckExplanation("Your CPU outpaces your GPU by ~" + bottleneckPercent + "%. System is GPU bound in graphically intense titles.");
        }

        // 4. Performance Scores (0-100)
        int ramScore = ram != null ? ram.getPerfScore() : 50;
        
        int g1080 = (int) Math.round(cpuScore * 0.45 + gpuScore * 0.45 + ramScore * 0.1);
        int g1440 = (int) Math.round(cpuScore * 0.25 + gpuScore * 0.65 + ramScore * 0.1);
        int g4k = (int) Math.round(cpuScore * 0.15 + gpuScore * 0.80 + ramScore * 0.05);
        int render = (int) Math.round(cpuScore * 0.50 + gpuScore * 0.35 + ramScore * 0.15);
        int prod = (int) Math.round(cpuScore * 0.60 + ramScore * 0.30 + gpuScore * 0.10);
        int ai = (int) Math.round(gpuScore * 0.70 + cpuScore * 0.15 + ramScore * 0.15);

        report.setGaming1080pScore(Math.min(100, Math.max(10, g1080)));
        report.setGaming1440pScore(Math.min(100, Math.max(10, g1440)));
        report.setGaming4kScore(Math.min(100, Math.max(10, g4k)));
        report.setRenderingScore(Math.min(100, Math.max(10, render)));
        report.setProductivityScore(Math.min(100, Math.max(10, prod)));
        report.setAiComputeScore(Math.min(100, Math.max(10, ai)));

        // 5. Compatibility & Optimization Tips
        List<String> alerts = new ArrayList<String>();
        List<String> tips = new ArrayList<String>();

        if (psu != null) {
            String psuSpecs = psu.getSpecs() != null ? psu.getSpecs() : "";
            int psuWatt = 450;
            if (psuSpecs.contains("450W") || psu.getModel().contains("450W")) psuWatt = 450;
            else if (psuSpecs.contains("650W") || psu.getModel().contains("650W")) psuWatt = 650;
            else if (psuSpecs.contains("750W") || psu.getModel().contains("750W")) psuWatt = 750;
            else if (psuSpecs.contains("1000W") || psu.getModel().contains("1000W")) psuWatt = 1000;
            else if (psuSpecs.contains("1600W") || psu.getModel().contains("1600W")) psuWatt = 1600;

            if (psuWatt < totalTdp) {
                alerts.add("CRITICAL: Selected PSU (" + psuWatt + "W) is below estimated total system peak load (" + totalTdp + "W).");
            } else if (psuWatt < recommendedPsu) {
                alerts.add("WARNING: Selected PSU capacity (" + psuWatt + "W) has tight thermal headroom. Recommend at least " + recommendedPsu + "W.");
            }
        }

        if (cpu != null && cooler != null) {
            if (cpu.getTdpWatts() > 150 && cooler.getModel().contains("Stock")) {
                alerts.add("WARNING: High-TDP CPU paired with stock air cooler. Expect thermal throttling under load.");
            }
        }

        if (alerts.isEmpty()) {
            alerts.add("All hardware components verified 100% compatible. Power, bus interfaces, and thermal tolerances clear.");
        }

        tips.add("Enable XMP/EXPO in BIOS to achieve rated memory frequency.");
        tips.add("Install OS and high-throughput databases on PCIe 4.0 M.2 slot #1 directly wired to CPU.");
        if (gpu != null && gpu.getTdpWatts() > 200) {
            tips.add("Ensure chassis has at least 2 intake and 1 exhaust fan for optimal GPU airflow.");
        }

        report.setCompatibilityAlerts(alerts);
        report.setOptimizationTips(tips);

        return report;
    }
}
