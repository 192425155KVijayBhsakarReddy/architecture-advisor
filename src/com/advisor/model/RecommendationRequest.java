package com.advisor.model;

public class RecommendationRequest {
    private String environment; // basic, entry_office, media, home, office, studio, esports, edge, cloud, research, datacenter
    private String tier;        // budget, balanced, enthusiast
    private double maxBudget;   // maximum price target
    private String formFactor;  // ATX, Micro-ATX, Mini-ITX, Rack
    private String preference;  // balanced, gaming, multicore, efficiency

    public RecommendationRequest() {}

    public String getEnvironment() { return environment != null ? environment : "home"; }
    public void setEnvironment(String environment) { this.environment = environment; }

    public String getTier() { return tier != null ? tier : "balanced"; }
    public void setTier(String tier) { this.tier = tier; }

    public double getMaxBudget() { return maxBudget; }
    public void setMaxBudget(double maxBudget) { this.maxBudget = maxBudget; }

    public String getFormFactor() { return formFactor != null ? formFactor : "ATX"; }
    public void setFormFactor(String formFactor) { this.formFactor = formFactor; }

    public String getPreference() { return preference != null ? preference : "balanced"; }
    public void setPreference(String preference) { this.preference = preference; }
}
