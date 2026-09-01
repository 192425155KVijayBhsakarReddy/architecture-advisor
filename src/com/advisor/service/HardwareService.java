package com.advisor.service;

import com.advisor.model.HardwareComponent;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class HardwareService {
    private final List<HardwareComponent> catalog = new ArrayList<HardwareComponent>();

    public HardwareService() {
        initCatalog();
    }

    private void initCatalog() {
        // === CPUs ===
        // Basic / Student
        add("cpu", "entry basic", "basic", "Intel", "Core i3-12100", "4 Cores / 8 Threads, 4.3GHz Turbo, Intel UHD 730 iGPU", "60W TDP", "Power Draw", "Best Value Student", 7990, 60, 48);
        add("cpu", "entry basic", "basic", "AMD", "Ryzen 3 3200G", "4 Cores / 4 Threads, 4.0GHz Boost, Radeon Vega 8 iGPU", "65W TDP", "Power Draw", "Budget iGPU", 6490, 65, 42);
        add("cpu", "entry basic", "basic", "Intel", "Celeron G6900", "2 Cores / 2 Threads, 3.4GHz, Basic Web & Browsing", "46W TDP", "Power Draw", "Entry Web", 3990, 46, 25);

        // Office / POS
        add("cpu", "entry budget", "entry_office", "Intel", "Core i3-14100", "4 Cores / 8 Threads, 4.7GHz Turbo, Intel UHD 730 iGPU", "60W TDP", "Power Draw", "Office Productivity", 9990, 60, 55);
        add("cpu", "budget", "entry_office", "AMD", "Ryzen 5 5600G", "6 Cores / 12 Threads, 4.4GHz Boost, Radeon Graphics", "65W TDP", "Power Draw", "POS Workstation", 11490, 65, 62);
        add("cpu", "budget", "entry_office", "Intel", "Core i5-12400", "6 Cores / 12 Threads, 4.4GHz Turbo, Intel UHD 730", "65W TDP", "Power Draw", "Multi-Tasking", 13990, 65, 68);

        // Media / NAS
        add("cpu", "entry budget", "media", "Intel", "Core i3-13100T", "4 Cores / 8 Threads, 35W Low-Power, UHD 730 QuickSync", "35W TDP", "Power Draw", "Low Power HTPC", 10990, 35, 52);
        add("cpu", "entry budget", "media", "AMD", "Ryzen 5 4600G", "6 Cores / 12 Threads, 4.2GHz, Radeon Graphics", "65W TDP", "Power Draw", "NAS Streamer", 8990, 65, 58);

        // Home / Gaming Den
        add("cpu", "mid high", "home", "AMD", "Ryzen 7 7800X3D", "8 Cores / 16 Threads, 5.0GHz Boost, 96MB 3D V-Cache", "120W TDP", "Power Draw", "Gaming Champion", 35990, 120, 96);
        add("cpu", "budget mid", "home", "AMD", "Ryzen 5 7600X", "6 Cores / 12 Threads, 5.3GHz Turbo, 32MB L3 Cache", "105W TDP", "Power Draw", "Budget Gaming", 19490, 105, 78);
        add("cpu", "high", "home", "Intel", "Core i7-14700K", "20 Cores (8P+12E) / 28 Threads, 5.6GHz Turbo", "125W TDP", "Power Draw", "Hybrid Gaming", 37990, 125, 92);
        add("cpu", "enthusiast", "home", "AMD", "Ryzen 7 9800X3D", "8 Cores / 16 Threads, 5.2GHz Boost, 2nd Gen 3D V-Cache", "120W TDP", "Power Draw", "Ultrafast 1% Lows", 44990, 120, 99);

        // Office CAD
        add("cpu", "budget mid", "office", "Intel", "Core i5-14500", "14 Cores (6P+8E) / 20 Threads, UHD 770 Graphics", "65W TDP", "Power Draw", "Silent Office", 22490, 65, 75);
        add("cpu", "mid", "office", "AMD", "Ryzen 7 7700", "8 Cores / 16 Threads, 5.3GHz Boost, Efficient 65W", "65W TDP", "Power Draw", "Low Power Work", 28990, 65, 82);
        add("cpu", "high", "office", "Intel", "Core i7-14700", "20 Cores (8P+12E) / 28 Threads, 5.4GHz Turbo", "65W TDP", "Power Draw", "CAD Precision", 35490, 65, 89);
        add("cpu", "enthusiast", "office", "AMD", "Ryzen 9 7900X", "12 Cores / 24 Threads, 5.6GHz Boost, High Single-IPC", "170W TDP", "Power Draw", "3D CAD Engine", 38990, 170, 94);

        // Studio / VFX
        add("cpu", "high", "studio", "Intel", "Core i9-14900K", "24 Cores (8P+16E) / 32 Threads, 6.0GHz Max Turbo", "253W TDP", "Power Draw", "Heavy Render", 53990, 253, 98);
        add("cpu", "high", "studio", "AMD", "Ryzen 9 7950X", "16 Cores / 32 Threads, 5.7GHz Boost, 80MB Cache", "170W TDP", "Power Draw", "8K VFX Engine", 52990, 170, 97);
        add("cpu", "enthusiast", "studio", "AMD", "Ryzen 9 7950X3D", "16 Cores / 32 Threads, 144MB 3D V-Cache", "120W TDP", "Power Draw", "Creator Elite", 58990, 120, 98);

        // Esports
        add("cpu", "budget mid", "esports", "AMD", "Ryzen 7 5700X3D", "8 Cores / 16 Threads, 4.1GHz Boost, 96MB 3D Cache", "105W TDP", "Power Draw", "Low Latency", 21990, 105, 84);
        add("cpu", "budget", "esports", "Intel", "Core i5-14400F", "10 Cores (6P+4E) / 16 Threads, 4.7GHz Boost", "65W TDP", "Power Draw", "High FPS", 18490, 65, 74);

        // Edge AI / Cloud / Research
        add("cpu", "mid", "edge", "Intel", "Core Ultra 9 185H", "16 Cores / 22 Threads, 5.1GHz, Integrated NPU AI Engine", "45W TDP", "Power Draw", "Edge AI NPU", 48990, 45, 83);
        add("cpu", "high", "edge", "AMD", "Ryzen AI 9 HX 370", "12 Cores / 24 Threads, 5.1GHz, 50 NPU TOPS AI Engine", "28W TDP", "Power Draw", "Mobile TOPS", 54990, 28, 86);
        add("cpu", "high", "cloud", "AMD", "EPYC 9354", "32 Cores / 64 Threads, 3.8GHz Boost, 256MB L3 Cache", "280W TDP", "Power Draw", "VM Host", 285000, 280, 94);
        add("cpu", "enthusiast", "cloud", "AMD", "EPYC 9654 Genoa", "96 Cores / 192 Threads, 3.7GHz Boost, 384MB L3 Cache", "360W TDP", "Power Draw", "Cloud Beast", 780000, 360, 100);
        add("cpu", "high", "datacenter", "AMD", "Ryzen Threadripper 7970X", "32 Cores / 64 Threads, 5.3GHz Boost, 128MB Cache", "350W TDP", "Power Draw", "Data Workstation", 245000, 350, 96);
        add("cpu", "enthusiast", "datacenter", "AMD", "Ryzen Threadripper PRO 7995WX", "96 Cores / 192 Threads, 5.1GHz, 128 PCIe 5.0 Lanes", "350W TDP", "Power Draw", "96 Core Flagship", 850000, 350, 100);

        // === GPUs ===
        add("gpu", "entry", "basic entry_office media", "Intel / AMD", "Integrated UHD 730 / Vega 8 iGPU", "Shared System Memory, DirectX 12, 4K Display Output", "15W TDP", "Power Draw", "Integrated iGPU", 0, 15, 20);
        add("gpu", "budget", "basic entry_office office esports home", "NVIDIA", "GeForce RTX 3050 (6GB)", "6GB GDDR6, 2304 CUDA Cores, Compact 75W TDP", "75W TDP", "Power Draw", "Entry Discrete GPU", 15990, 75, 45);
        add("gpu", "budget mid", "home esports office", "NVIDIA", "GeForce RTX 4060 (8GB)", "8GB GDDR6, 3072 CUDA Cores, DLSS 3 Frame Gen", "115W TDP", "Power Draw", "1080p Ultra", 28990, 115, 68);
        add("gpu", "mid", "home office esports basic entry_office media", "NVIDIA", "GeForce RTX 4070 Super", "12GB GDDR6X, 7168 CUDA Cores, DLSS 3.5 Frame Gen", "220W TDP", "Power Draw", "1440p High FPS", 59990, 220, 86);
        add("gpu", "mid high", "home studio esports", "AMD", "Radeon RX 7900 XT", "20GB GDDR6, 84 Compute Units, 320-bit Bus", "315W TDP", "Power Draw", "20GB VRAM Value", 74990, 315, 90);
        add("gpu", "high", "studio cloud edge home", "NVIDIA", "GeForce RTX 4080 Super", "16GB GDDR6X, 10240 CUDA Cores, 3rd Gen RT Cores", "320W TDP", "Power Draw", "4K Ultra Gaming", 99990, 320, 95);
        add("gpu", "enthusiast", "research datacenter studio", "NVIDIA", "GeForce RTX 4090", "24GB GDDR6X, 16384 CUDA Cores, 2.52GHz Boost", "450W TDP", "Power Draw", "Flagship GPU", 189990, 450, 100);
        add("gpu", "enthusiast", "research datacenter", "NVIDIA", "H100 80GB SXM5", "80GB HBM3, 3.35TB/s Bandwidth, 4th Gen Tensor Cores", "700W TDP", "Power Draw", "LLM Supercomputing", 2850000, 700, 100);

        // === RAM ===
        add("ram", "entry", "basic entry_office media", "Crucial", "8GB DDR4 3200MHz", "1x8GB CL22 Single Channel, 1.2V", "5W TDP", "Power Draw", "Basic Memory", 1490, 5, 30);
        add("ram", "budget", "basic entry_office media home", "Corsair", "16GB (2x8GB) DDR4 3200MHz", "CL16 Dual Channel Vengeance LPX", "10W TDP", "Power Draw", "Budget Dual-Channel", 3290, 10, 60);
        add("ram", "mid", "home office esports", "Corsair", "32GB (2x16GB) DDR5 6000MHz", "CL30 Intel XMP & AMD EXPO Low Latency", "15W TDP", "Power Draw", "Sweetspot Gaming", 9990, 15, 88);
        add("ram", "high", "studio office datacenter", "G.Skill", "64GB (2x32GB) DDR5 6400MHz", "CL32 Trident Z5 RGB, High Bandwidth", "20W TDP", "Power Draw", "Creator Dual-Rank", 18990, 20, 95);
        add("ram", "enthusiast", "research datacenter studio", "Kingston", "128GB (4x32GB) DDR5 ECC Server", "Registered ECC Server Memory, Quad Channel", "35W TDP", "Power Draw", "ECC Server Memory", 45000, 35, 100);

        // === Motherboards ===
        add("mb", "entry", "basic entry_office", "ASRock", "H610M-HDV / B450M-HDV", "Micro-ATX, PCIe 4.0 x16, M.2 NVMe, Gigabit LAN", "25W TDP", "Power Draw", "Budget Board", 5490, 25, 40);
        add("mb", "budget", "home esports entry_office", "MSI", "PRO B760M-A / B650M Gaming", "Micro-ATX, DDR5 Support, 2x M.2 Gen4 Slots, 2.5G LAN", "35W TDP", "Power Draw", "Mainstream Choice", 11990, 35, 70);
        add("mb", "mid", "home office esports studio", "Gigabyte", "B650 AORUS ELITE AX", "ATX, 14+2+1 Phase VRM, PCIe 5.0 M.2, Wi-Fi 6E", "45W TDP", "Power Draw", "Robust Power Stage", 19990, 45, 88);
        add("mb", "high", "studio research home", "ASUS", "ROG STRIX Z790-E / X670E", "ATX, 18+1 Power Stages, PCIe 5.0 x16, Wi-Fi 7", "60W TDP", "Power Draw", "Enthusiast VRM", 38990, 60, 96);
        add("mb", "enthusiast", "datacenter research", "Supermicro", "H13SSL-N / WRX90 Server", "E-ATX, Dual 10G LAN, BMC Remote Mgmt, 128 PCIe Lanes", "90W TDP", "Power Draw", "Enterprise Server Board", 75000, 90, 100);

        // === Storage ===
        add("storage", "entry", "basic entry_office", "Kingston", "NV2 500GB NVMe SSD", "PCIe 4.0 x4, 3500 MB/s Read, 2100 MB/s Write", "4W TDP", "Power Draw", "Entry NVMe", 2990, 4, 50);
        add("storage", "budget", "basic entry_office media home", "Crucial", "P3 Plus 1TB Gen4 NVMe", "PCIe 4.0 x4, 5000 MB/s Read, 4200 MB/s Write", "5W TDP", "Power Draw", "Everyday Fast Storage", 5490, 5, 75);
        add("storage", "mid", "home office esports studio", "WD", "Black SN850X 1TB Gen4 NVMe", "PCIe 4.0 x4, 7300 MB/s Read, DRAM Cache", "7W TDP", "Power Draw", "High IOPS Gaming", 8490, 7, 92);
        add("storage", "high", "studio research datacenter", "Samsung", "990 PRO 2TB Gen4 NVMe", "PCIe 4.0 x4, 7450 MB/s Read, Nickel Cooled Controller", "9W TDP", "Power Draw", "Pro Production NVMe", 16990, 9, 98);
        add("storage", "enthusiast", "datacenter research", "Solidigm", "D5-P5336 15.36TB Enterprise", "U.2 / E1.L PCIe 4.0, 7000 MB/s, 5-Year Enterprise DWPD", "25W TDP", "Power Draw", "Enterprise NVMe Pool", 185000, 25, 100);

        // === Power Supply Units (PSU) ===
        add("psu", "entry", "basic entry_office media", "Ant Esports", "VS450L 450W", "Non-Modular, 120mm Silent Fan, Active PFC", "0W", "Efficiency: 80%+", "Entry 450W", 1990, 0, 40);
        add("psu", "budget", "basic entry_office home esports", "Corsair", "CV550 / CV650 650W 80+ Bronze", "80 PLUS Bronze Certified, Continuous Power Delivery", "0W", "Efficiency: 85%+", "Reliable Bronze", 4490, 0, 68);
        add("psu", "mid", "home office esports studio", "DeepCool", "PM750D / DQ750-M 750W Gold", "80 PLUS Gold Certified, Fully Modular, Flat Black Cables", "0W", "Efficiency: 90%+", "Gold Standard", 6990, 0, 85);
        add("psu", "high", "home studio research", "Corsair", "RM850x / RM1000x 1000W Gold", "80 PLUS Gold, ATX 3.0 & PCIe 5.0 12VHPWR Native", "0W", "Efficiency: 90%+", "ATX 3.0 Native", 14990, 0, 95);
        add("psu", "enthusiast", "datacenter research studio", "Seasonic", "PRIME TX-1600 1600W Titanium", "80 PLUS Titanium, Full Bridge LLC, 12-Year Warranty", "0W", "Efficiency: 94%+", "Titanium Flagship", 39990, 0, 100);

        // === Coolers ===
        add("cooler", "entry", "basic entry_office media", "Intel / AMD", "Stock Air Cooler Box", "Standard Included Aluminum Heatsink", "0W", "Stock Cooling", "Included Stock Cooler", 0, 0, 40);
        add("cooler", "budget", "home esports office", "DeepCool", "AG400 / AK400 Single Tower", "4 Direct-Touch Heatpipes, 120mm PWM Fan (220W TDP Cap)", "3W TDP", "Power Draw", "Budget Air Tower", 1890, 3, 70);
        add("cooler", "mid", "home studio esports", "Thermalright", "Peerless Assassin 120 SE", "Dual Tower, 6 Heatpipes, 2x 120mm PWM Fans (265W TDP Cap)", "5W TDP", "Power Draw", "Air Cooling King", 3490, 5, 88);
        add("cooler", "high", "studio research home", "ARCTIC", "Liquid Freezer III 360 AIO", "360mm Radiator, VRM Cooling Fan, Thick 38mm Matrix", "10W TDP", "Power Draw", "Extreme Liquid AIO", 10990, 10, 96);
        add("cooler", "enthusiast", "datacenter research", "Custom Water / Server", "Industrial 420mm / Delta Server Blower", "Dual High-Pressure PWM Pumps, 500W+ Heat Dissipation", "25W TDP", "Power Draw", "Industrial Thermals", 24990, 25, 100);
    }

    private void add(String type, String tier, String env, String brand, String model, 
                     String specs, String statVal, String statLabel, String badge, 
                     double price, int tdp, int perfScore) {
        catalog.add(new HardwareComponent(type, tier, env, brand, model, specs, statVal, statLabel, badge, price, tdp, perfScore));
    }

    public List<HardwareComponent> getAll() {
        return Collections.unmodifiableList(catalog);
    }

    public List<HardwareComponent> filter(String type, String tier, String env, String query) {
        List<HardwareComponent> results = new ArrayList<HardwareComponent>();
        for (HardwareComponent c : catalog) {
            if (type != null && !type.isEmpty() && !type.equalsIgnoreCase("all") && !c.getType().equalsIgnoreCase(type)) {
                continue;
            }
            if (tier != null && !tier.isEmpty() && !tier.equalsIgnoreCase("all") && !c.getTier().toLowerCase().contains(tier.toLowerCase())) {
                continue;
            }
            if (env != null && !env.isEmpty() && !env.equalsIgnoreCase("all") && !c.getEnvironment().toLowerCase().contains(env.toLowerCase())) {
                continue;
            }
            if (query != null && !query.trim().isEmpty()) {
                String q = query.toLowerCase().trim();
                boolean match = c.getModel().toLowerCase().contains(q) ||
                                c.getBrand().toLowerCase().contains(q) ||
                                c.getSpecs().toLowerCase().contains(q) ||
                                c.getBadge().toLowerCase().contains(q);
                if (!match) continue;
            }
            results.add(c);
        }
        return results;
    }

    public HardwareComponent findByModel(String model) {
        if (model == null) return null;
        for (HardwareComponent c : catalog) {
            if (c.getModel().equalsIgnoreCase(model.trim())) {
                return c;
            }
        }
        return null;
    }

    public HardwareComponent findByTypeAndEnvironment(String type, String env, String tier) {
        for (HardwareComponent c : catalog) {
            if (c.getType().equalsIgnoreCase(type) &&
                c.getEnvironment().contains(env) &&
                (tier == null || c.getTier().contains(tier))) {
                return c;
            }
        }
        // Fallback to any matching type
        for (HardwareComponent c : catalog) {
            if (c.getType().equalsIgnoreCase(type)) {
                return c;
            }
        }
        return null;
    }
}
