package com.advisor.model;

import java.util.Objects;

public class HardwareComponent {
    private String type;        // cpu, gpu, ram, mb, storage, psu, cooler
    private String tier;        // entry, budget, mid, high, enthusiast
    private String environment; // basic, entry_office, media, home, office, studio, esports, edge, cloud, research, datacenter
    private String brand;       // Intel, AMD, NVIDIA, Corsair, ASUS, etc.
    private String model;       // Core i5-14400F, RTX 4070 Super, etc.
    private String specs;       // specs description
    private String statVal;     // e.g. 65W TDP, 16GB VRAM
    private String statLabel;   // e.g. Power Draw, VRAM
    private String badge;       // e.g. High FPS, Best Value
    private double price;       // in INR or base currency
    private int tdpWatts;       // raw wattage consumption
    private int perfScore;      // relative performance index 1-100

    public HardwareComponent() {}

    public HardwareComponent(String type, String tier, String environment, String brand, 
                             String model, String specs, String statVal, String statLabel, 
                             String badge, double price, int tdpWatts, int perfScore) {
        this.type = type;
        this.tier = tier;
        this.environment = environment;
        this.brand = brand;
        this.model = model;
        this.specs = specs;
        this.statVal = statVal;
        this.statLabel = statLabel;
        this.badge = badge;
        this.price = price;
        this.tdpWatts = tdpWatts;
        this.perfScore = perfScore;
    }

    // Getters and Setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getTier() { return tier; }
    public void setTier(String tier) { this.tier = tier; }

    public String getEnvironment() { return environment; }
    public void setEnvironment(String environment) { this.environment = environment; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getSpecs() { return specs; }
    public void setSpecs(String specs) { this.specs = specs; }

    public String getStatVal() { return statVal; }
    public void setStatVal(String statVal) { this.statVal = statVal; }

    public String getStatLabel() { return statLabel; }
    public void setStatLabel(String statLabel) { this.statLabel = statLabel; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getTdpWatts() { return tdpWatts; }
    public void setTdpWatts(int tdpWatts) { this.tdpWatts = tdpWatts; }

    public int getPerfScore() { return perfScore; }
    public void setPerfScore(int perfScore) { this.perfScore = perfScore; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HardwareComponent that = (HardwareComponent) o;
        return Objects.equals(type, that.type) && Objects.equals(model, that.model);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, model);
    }
}
