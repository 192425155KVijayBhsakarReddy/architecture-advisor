package com.advisor.service;

import com.advisor.model.HardwareComponent;
import com.advisor.model.RecommendationRequest;

import java.util.ArrayList;
import java.util.List;

public class RecommendationEngine {
    private final HardwareService hardwareService;

    public RecommendationEngine(HardwareService hardwareService) {
        this.hardwareService = hardwareService;
    }

    public List<HardwareComponent> recommend(RecommendationRequest request) {
        String env = request.getEnvironment().toLowerCase();
        String tier = request.getTier().toLowerCase();
        List<HardwareComponent> build = new ArrayList<HardwareComponent>();

        // 1. Select CPU
        HardwareComponent cpu = hardwareService.findByTypeAndEnvironment("cpu", env, tier);
        if (cpu != null) build.add(cpu);

        // 2. Select GPU
        HardwareComponent gpu = hardwareService.findByTypeAndEnvironment("gpu", env, tier);
        if (gpu != null) build.add(gpu);

        // 3. Select RAM
        HardwareComponent ram = hardwareService.findByTypeAndEnvironment("ram", env, tier);
        if (ram != null) build.add(ram);

        // 4. Select Motherboard
        HardwareComponent mb = hardwareService.findByTypeAndEnvironment("mb", env, tier);
        if (mb != null) build.add(mb);

        // 5. Select Storage
        HardwareComponent storage = hardwareService.findByTypeAndEnvironment("storage", env, tier);
        if (storage != null) build.add(storage);

        // 6. Select PSU
        HardwareComponent psu = hardwareService.findByTypeAndEnvironment("psu", env, tier);
        if (psu != null) build.add(psu);

        // 7. Select Cooler
        HardwareComponent cooler = hardwareService.findByTypeAndEnvironment("cooler", env, tier);
        if (cooler != null) build.add(cooler);

        return build;
    }
}
