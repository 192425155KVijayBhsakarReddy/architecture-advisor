package com.advisor.model;

import java.util.List;

public class AnalysisRequest {
    private String cpuModel;
    private String gpuModel;
    private String ramModel;
    private String mbModel;
    private String storageModel;
    private String psuModel;
    private String coolerModel;
    private String targetWorkload;

    public AnalysisRequest() {}

    public String getCpuModel() { return cpuModel; }
    public void setCpuModel(String cpuModel) { this.cpuModel = cpuModel; }

    public String getGpuModel() { return gpuModel; }
    public void setGpuModel(String gpuModel) { this.gpuModel = gpuModel; }

    public String getRamModel() { return ramModel; }
    public void setRamModel(String ramModel) { this.ramModel = ramModel; }

    public String getMbModel() { return mbModel; }
    public void setMbModel(String mbModel) { this.mbModel = mbModel; }

    public String getStorageModel() { return storageModel; }
    public void setStorageModel(String storageModel) { this.storageModel = storageModel; }

    public String getPsuModel() { return psuModel; }
    public void setPsuModel(String psuModel) { this.psuModel = psuModel; }

    public String getCoolerModel() { return coolerModel; }
    public void setCoolerModel(String coolerModel) { this.coolerModel = coolerModel; }

    public String getTargetWorkload() { return targetWorkload != null ? targetWorkload : "home"; }
    public void setTargetWorkload(String targetWorkload) { this.targetWorkload = targetWorkload; }
}
