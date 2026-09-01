package com.advisor.model;

import java.util.ArrayList;
import java.util.List;

public class BuildReport {
    private double totalPrice;
    private int totalTdpWatts;
    private int recommendedPsuWatts;
    private double bottleneckPercentage;
    private String bottleneckComponent; // CPU, GPU, or Balanced
    private String bottleneckExplanation;
    
    // Performance Scores (0-100)
    private int gaming1080pScore;
    private int gaming1440pScore;
    private int gaming4kScore;
    private int renderingScore;
    private int productivityScore;
    private int aiComputeScore;
    
    private List<String> compatibilityAlerts;
    private List<String> optimizationTips;
    private List<HardwareComponent> selectedComponents;

    public BuildReport() {
        this.compatibilityAlerts = new ArrayList<String>();
        this.optimizationTips = new ArrayList<String>();
        this.selectedComponents = new ArrayList<HardwareComponent>();
    }

    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }

    public int getTotalTdpWatts() { return totalTdpWatts; }
    public void setTotalTdpWatts(int totalTdpWatts) { this.totalTdpWatts = totalTdpWatts; }

    public int getRecommendedPsuWatts() { return recommendedPsuWatts; }
    public void setRecommendedPsuWatts(int recommendedPsuWatts) { this.recommendedPsuWatts = recommendedPsuWatts; }

    public double getBottleneckPercentage() { return bottleneckPercentage; }
    public void setBottleneckPercentage(double bottleneckPercentage) { this.bottleneckPercentage = bottleneckPercentage; }

    public String getBottleneckComponent() { return bottleneckComponent; }
    public void setBottleneckComponent(String bottleneckComponent) { this.bottleneckComponent = bottleneckComponent; }

    public String getBottleneckExplanation() { return bottleneckExplanation; }
    public void setBottleneckExplanation(String bottleneckExplanation) { this.bottleneckExplanation = bottleneckExplanation; }

    public int getGaming1080pScore() { return gaming1080pScore; }
    public void setGaming1080pScore(int gaming1080pScore) { this.gaming1080pScore = gaming1080pScore; }

    public int getGaming1440pScore() { return gaming1440pScore; }
    public void setGaming1440pScore(int gaming1440pScore) { this.gaming1440pScore = gaming1440pScore; }

    public int getGaming4kScore() { return gaming4kScore; }
    public void setGaming4kScore(int gaming4kScore) { this.gaming4kScore = gaming4kScore; }

    public int getRenderingScore() { return renderingScore; }
    public void setRenderingScore(int renderingScore) { this.renderingScore = renderingScore; }

    public int getProductivityScore() { return productivityScore; }
    public void setProductivityScore(int productivityScore) { this.productivityScore = productivityScore; }

    public int getAiComputeScore() { return aiComputeScore; }
    public void setAiComputeScore(int aiComputeScore) { this.aiComputeScore = aiComputeScore; }

    public List<String> getCompatibilityAlerts() { return compatibilityAlerts; }
    public void setCompatibilityAlerts(List<String> compatibilityAlerts) { this.compatibilityAlerts = compatibilityAlerts; }

    public List<String> getOptimizationTips() { return optimizationTips; }
    public void setOptimizationTips(List<String> optimizationTips) { this.optimizationTips = optimizationTips; }

    public List<HardwareComponent> getSelectedComponents() { return selectedComponents; }
    public void setSelectedComponents(List<HardwareComponent> selectedComponents) { this.selectedComponents = selectedComponents; }
}
