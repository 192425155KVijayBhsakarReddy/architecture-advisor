/* ============================================================ */
/* COMPUTER HARDWARE & PERFORMANCE ANALYZER                     */
/* CSV-Driven Dynamic Engine + Scroll Reveal                    */
/* Author: Vijay Bhaskar Reddy                                  */
/* ============================================================ */

(function () {
  'use strict';

  /* ---------------------------------------------------------- */
  /* 1. GLOBAL HARDWARE DATABASE (populated from CSV fetch)     */
  /* ---------------------------------------------------------- */
  let hardwareDatabase = [];

  const fallbackHardwareDatabase = [
    // CPU - Basic Home / Student PC (basic)
    { type: 'cpu', tier: 'entry basic', environment: 'basic', brand: 'Intel', model: 'Core i3-12100', specs: '4 Cores / 8 Threads, 4.3GHz Turbo, Intel UHD 730 iGPU', stat_val: '60W TDP', stat_label: 'Power Draw', badge: 'Best Value Student', price: 7990 },
    { type: 'cpu', tier: 'entry basic', environment: 'basic', brand: 'AMD', model: 'Ryzen 3 3200G', specs: '4 Cores / 4 Threads, 4.0GHz Boost, Radeon Vega 8 iGPU', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'Budget iGPU', price: 6490 },
    { type: 'cpu', tier: 'entry basic', environment: 'basic', brand: 'Intel', model: 'Celeron G6900', specs: '2 Cores / 2 Threads, 3.4GHz, Basic Web & Browsing', stat_val: '46W TDP', stat_label: 'Power Draw', badge: 'Entry Web', price: 3990 },

    // CPU - Entry Office & POS Kiosk (entry_office)
    { type: 'cpu', tier: 'entry budget', environment: 'entry_office', brand: 'Intel', model: 'Core i3-14100', specs: '4 Cores / 8 Threads, 4.7GHz Turbo, Intel UHD 730 iGPU', stat_val: '60W TDP', stat_label: 'Power Draw', badge: 'Office Productivity', price: 9990 },
    { type: 'cpu', tier: 'budget', environment: 'entry_office', brand: 'AMD', model: 'Ryzen 5 5600G', specs: '6 Cores / 12 Threads, 4.4GHz Boost, Radeon Graphics', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'POS Workstation', price: 11490 },
    { type: 'cpu', tier: 'budget', environment: 'entry_office', brand: 'Intel', model: 'Core i5-12400', specs: '6 Cores / 12 Threads, 4.4GHz Turbo, Intel UHD 730', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'Multi-Tasking', price: 13990 },

    // CPU - Home Media HTPC / NAS Server (media)
    { type: 'cpu', tier: 'entry budget', environment: 'media', brand: 'Intel', model: 'Core i3-13100T', specs: '4 Cores / 8 Threads, 35W Low-Power, UHD 730 QuickSync', stat_val: '35W TDP', stat_label: 'Power Draw', badge: 'Low Power HTPC', price: 10990 },
    { type: 'cpu', tier: 'entry budget', environment: 'media', brand: 'AMD', model: 'Ryzen 5 4600G', specs: '6 Cores / 12 Threads, 4.2GHz, Radeon Graphics', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'NAS Streamer', price: 8990 },

    // CPU - Home / Gaming Den (home)
    { type: 'cpu', tier: 'mid high', environment: 'home', brand: 'AMD', model: 'Ryzen 7 7800X3D', specs: '8 Cores / 16 Threads, 5.0GHz Boost, 96MB 3D V-Cache', stat_val: '120W TDP', stat_label: 'Power Draw', badge: 'Gaming Champion', price: 35990 },
    { type: 'cpu', tier: 'budget mid', environment: 'home', brand: 'AMD', model: 'Ryzen 5 7600X', specs: '6 Cores / 12 Threads, 5.3GHz Turbo, 32MB L3 Cache', stat_val: '105W TDP', stat_label: 'Power Draw', badge: 'Budget Gaming', price: 19490 },
    { type: 'cpu', tier: 'high', environment: 'home', brand: 'Intel', model: 'Core i7-14700K', specs: '20 Cores (8P+12E) / 28 Threads, 5.6GHz Turbo', stat_val: '125W TDP', stat_label: 'Power Draw', badge: 'Hybrid Gaming', price: 37990 },
    { type: 'cpu', tier: 'enthusiast', environment: 'home', brand: 'AMD', model: 'Ryzen 7 9800X3D', specs: '8 Cores / 16 Threads, 5.2GHz Boost, 2nd Gen 3D V-Cache', stat_val: '120W TDP', stat_label: 'Power Draw', badge: 'Ultrafast 1% Lows', price: 44990 },

    // CPU - Office & CAD Workstation (office)
    { type: 'cpu', tier: 'budget mid', environment: 'office', brand: 'Intel', model: 'Core i5-14500', specs: '14 Cores (6P+8E) / 20 Threads, UHD 770 Graphics', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'Silent Office', price: 22490 },
    { type: 'cpu', tier: 'mid', environment: 'office', brand: 'AMD', model: 'Ryzen 7 7700', specs: '8 Cores / 16 Threads, 5.3GHz Boost, Efficient 65W', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'Low Power Work', price: 28990 },
    { type: 'cpu', tier: 'high', environment: 'office', brand: 'Intel', model: 'Core i7-14700', specs: '20 Cores (8P+12E) / 28 Threads, 5.4GHz Turbo', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'CAD Precision', price: 35490 },
    { type: 'cpu', tier: 'enthusiast', environment: 'office', brand: 'AMD', model: 'Ryzen 9 7900X', specs: '12 Cores / 24 Threads, 5.6GHz Boost, High Single-IPC', stat_val: '170W TDP', stat_label: 'Power Draw', badge: '3D CAD Engine', price: 38990 },

    // CPU - Studio & Production (studio)
    { type: 'cpu', tier: 'high', environment: 'studio', brand: 'Intel', model: 'Core i9-14900K', specs: '24 Cores (8P+16E) / 32 Threads, 6.0GHz Max Turbo', stat_val: '253W TDP', stat_label: 'Power Draw', badge: 'Heavy Render', price: 53990 },
    { type: 'cpu', tier: 'high', environment: 'studio', brand: 'AMD', model: 'Ryzen 9 7950X', specs: '16 Cores / 32 Threads, 5.7GHz Boost, 80MB Cache', stat_val: '170W TDP', stat_label: 'Power Draw', badge: '8K VFX Engine', price: 52990 },
    { type: 'cpu', tier: 'enthusiast', environment: 'studio', brand: 'Intel', model: 'Core i9-14900KS', specs: '24 Cores / 32 Threads, 6.2GHz Special Edition', stat_val: '253W TDP', stat_label: 'Power Draw', badge: 'Extreme Speed', price: 64990 },
    { type: 'cpu', tier: 'enthusiast', environment: 'studio', brand: 'AMD', model: 'Ryzen 9 7950X3D', specs: '16 Cores / 32 Threads, 144MB 3D V-Cache', stat_val: '120W TDP', stat_label: 'Power Draw', badge: 'Creator Elite', price: 58990 },

    // CPU - eSports Arena & LAN Rig (esports)
    { type: 'cpu', tier: 'budget mid', environment: 'esports', brand: 'AMD', model: 'Ryzen 7 5700X3D', specs: '8 Cores / 16 Threads, 4.1GHz Boost, 96MB 3D Cache', stat_val: '105W TDP', stat_label: 'Power Draw', badge: 'Low Latency', price: 21990 },
    { type: 'cpu', tier: 'budget', environment: 'esports', brand: 'Intel', model: 'Core i5-14400F', specs: '10 Cores (6P+4E) / 16 Threads, 4.7GHz Boost', stat_val: '65W TDP', stat_label: 'Power Draw', badge: 'High FPS', price: 18490 },
    { type: 'cpu', tier: 'high', environment: 'esports', brand: 'AMD', model: 'Ryzen 7 7800X3D', specs: '8 Cores / 16 Threads, 5.0GHz, 240Hz+ Competitive', stat_val: '120W TDP', stat_label: 'Power Draw', badge: 'eSports Champ', price: 35990 },
    { type: 'cpu', tier: 'enthusiast', environment: 'esports', brand: 'Intel', model: 'Core i7-14700KF', specs: '20 Cores / 28 Threads, 5.6GHz Turbo', stat_val: '125W TDP', stat_label: 'Power Draw', badge: 'Tournament Rig', price: 36490 },

    // CPU - Edge AI & Mobile Lab (edge)
    { type: 'cpu', tier: 'mid', environment: 'edge', brand: 'Intel', model: 'Core Ultra 9 185H', specs: '16 Cores / 22 Threads, 5.1GHz, Integrated NPU AI Engine', stat_val: '45W TDP', stat_label: 'Power Draw', badge: 'Edge AI NPU', price: 48990 },
    { type: 'cpu', tier: 'high', environment: 'edge', brand: 'AMD', model: 'Ryzen AI 9 HX 370', specs: '12 Cores / 24 Threads, 5.1GHz, 50 NPU TOPS AI Engine', stat_val: '28W TDP', stat_label: 'Power Draw', badge: 'Mobile TOPS', price: 54990 },
    { type: 'cpu', tier: 'enthusiast', environment: 'edge', brand: 'Intel', model: 'Xeon w5-2465X', specs: '16 Cores / 32 Threads, AVX-512 & AMX Matrix AI Accelerator', stat_val: '200W TDP', stat_label: 'Power Draw', badge: 'AMX Matrix AI', price: 125000 },

    // CPU - Cloud Native & Server Host (cloud)
    { type: 'cpu', tier: 'mid', environment: 'cloud', brand: 'AMD', model: 'EPYC 9354', specs: '32 Cores / 64 Threads, 3.8GHz Boost, 256MB L3 Cache', stat_val: '280W TDP', stat_label: 'Power Draw', badge: 'VM Host', price: 285000 },
    { type: 'cpu', tier: 'high', environment: 'cloud', brand: 'Intel', model: 'Xeon Gold 6448Y', specs: '32 Cores / 64 Threads, 4.1GHz Turbo, 60MB L3 Cache', stat_val: '225W TDP', stat_label: 'Power Draw', badge: 'Cloud Server', price: 310000 },
    { type: 'cpu', tier: 'enthusiast', environment: 'cloud', brand: 'AMD', model: 'EPYC 9654 Genoa', specs: '96 Cores / 192 Threads, 3.7GHz Boost, 384MB L3 Cache', stat_val: '360W TDP', stat_label: 'Power Draw', badge: 'Cloud Beast', price: 780000 },

    // CPU - HPC Supercomputer Cluster (research)
    { type: 'cpu', tier: 'high', environment: 'research', brand: 'AMD', model: 'EPYC 9554', specs: '64 Cores / 128 Threads, 3.75GHz Boost, 256MB Cache', stat_val: '320W TDP', stat_label: 'Power Draw', badge: 'HPC Compute', price: 520000 },
    { type: 'cpu', tier: 'enthusiast', environment: 'research', brand: 'Intel', model: 'Xeon Max 9480', specs: '56 Cores / 112 Threads, 64GB HBM2e High-Bandwidth Memory', stat_val: '350W TDP', stat_label: 'Power Draw', badge: 'HBM2e Bandwidth', price: 890000 },
    { type: 'cpu', tier: 'enthusiast', environment: 'research', brand: 'AMD', model: 'EPYC 9754 Bergamo', specs: '128 Cores / 256 Threads, Cloud Native HPC Engine', stat_val: '360W TDP', stat_label: 'Power Draw', badge: '128 Core Cluster', price: 950000 },
    { type: 'cpu', tier: 'enthusiast', environment: 'research', brand: 'Ampere', model: 'AmpereOne A192-32X', specs: '192 Cloud-Native Arm Cores, 2.0GHz, 2TB/s Bandwidth', stat_val: '280W TDP', stat_label: 'Power Draw', badge: '192 Arm Cores', price: 680000 },

    // CPU - Rack Data Center (datacenter)
    { type: 'cpu', tier: 'high', environment: 'datacenter', brand: 'AMD', model: 'Ryzen Threadripper 7970X', specs: '32 Cores / 64 Threads, 5.3GHz Boost, 128MB Cache', stat_val: '350W TDP', stat_label: 'Power Draw', badge: 'Data Workstation', price: 245000 },
    { type: 'cpu', tier: 'enthusiast', environment: 'datacenter', brand: 'Intel', model: 'Xeon w9-3495X', specs: '56 Cores / 112 Threads, 4.8GHz Turbo, 112 PCIe 5.0 Lanes', stat_val: '350W TDP', stat_label: 'Power Draw', badge: 'Enterprise Workstation', price: 490000 },
    { type: 'cpu', tier: 'enthusiast', environment: 'datacenter', brand: 'AMD', model: 'Ryzen Threadripper PRO 7995WX', specs: '96 Cores / 192 Threads, 5.1GHz, 128 PCIe 5.0 Lanes', stat_val: '350W TDP', stat_label: 'Power Draw', badge: '96 Core Flagship', price: 850000 },
    
    // GPU
    { type: 'gpu', tier: 'entry', environment: 'basic entry_office media', brand: 'Intel / AMD', model: 'Integrated UHD 730 / Vega 8 iGPU', specs: 'Shared System Memory, DirectX 12, 4K Display Output', stat_val: '15W TDP', stat_label: 'Power Draw', badge: 'Integrated iGPU', price: 0 },
    { type: 'gpu', tier: 'budget', environment: 'basic entry_office office esports home', brand: 'NVIDIA', model: 'GeForce GTX 1650 / RTX 3050 (6GB)', specs: '6GB GDDR6, 2304 CUDA Cores, Compact 75W TDP', stat_val: '75W TDP', stat_label: 'Power Draw', badge: 'Entry Discrete GPU', price: 15990 },
    { type: 'gpu', tier: 'mid', environment: 'home office esports basic entry_office media', brand: 'NVIDIA', model: 'GeForce RTX 4070 Super', specs: '12GB GDDR6X, 7168 CUDA Cores, DLSS 3.5 Frame Gen', stat_val: '220W TDP', stat_label: 'Power Draw', badge: '1440p High FPS', price: 59990 },
    { type: 'gpu', tier: 'high', environment: 'studio cloud edge', brand: 'NVIDIA', model: 'GeForce RTX 4080 Super', specs: '16GB GDDR6X, 10240 CUDA Cores, 3rd Gen RT Cores', stat_val: '320W TDP', stat_label: 'Power Draw', badge: '4K Ultra Gaming', price: 99990 },
    { type: 'gpu', tier: 'enthusiast', environment: 'research datacenter', brand: 'NVIDIA', model: 'GeForce RTX 4090', specs: '24GB GDDR6X, 16384 CUDA Cores, 2.52GHz Boost', stat_val: '450W TDP', stat_label: 'Power Draw', badge: 'Flagship GPU', price: 189990 },
    
    // Motherboard
    { type: 'mobo', tier: 'entry', environment: 'basic entry_office media', brand: 'ASUS', model: 'PRIME H610M-K D4', specs: 'LGA1700 mATX, PCIe 4.0 NVMe, USB 3.2 Gen 1, HDMI', stat_val: 'H610', stat_label: 'Chipset', badge: 'Entry Compact', price: 6490 },
    { type: 'mobo', tier: 'budget', environment: 'basic entry_office office home esports', brand: 'ASUS', model: 'PRIME B660M-A WiFi', specs: 'LGA1700 mATX, PCIe 4.0, Wi-Fi 6, Dual M.2 NVMe', stat_val: 'B660', stat_label: 'Chipset', badge: 'Budget Stable', price: 12490 },
    { type: 'mobo', tier: 'mid', environment: 'home office esports', brand: 'ASUS', model: 'TUF Gaming B650-Plus WiFi', specs: '12+2 Power Stages, PCIe 5.0 M.2, DDR5-6400+, Wi-Fi 6E', stat_val: 'B650', stat_label: 'Chipset', badge: 'Durable & Stable', price: 20990 },
    { type: 'mobo', tier: 'high', environment: 'studio cloud edge', brand: 'ASUS', model: 'ROG Strix X670E-E Gaming', specs: '18+2 VRM Phases, PCIe 5.0 GPU & NVMe, USB4 40Gbps', stat_val: 'X670E', stat_label: 'Chipset', badge: 'Overclock Ready', price: 44990 },
    { type: 'mobo', tier: 'enthusiast', environment: 'research datacenter', brand: 'MSI', model: 'MEG Z790 GODLIKE MAX', specs: '26+2 VRM Phases, 3.5-inch M-Vision Dashboard, 10G LAN', stat_val: 'Z790', stat_label: 'Chipset', badge: 'Godlike Tier', price: 109990 },

    // RAM
    { type: 'ram', tier: 'entry', environment: 'basic entry_office media', brand: 'Crucial', model: '4GB DDR4-3200MHz', specs: 'Single 4GB Stick 3200MHz CL22 Value RAM', stat_val: 'CL22 @ 3200MHz', stat_label: 'Memory Speed', badge: 'Entry Memory', price: 1290 },
    { type: 'ram', tier: 'budget', environment: 'basic entry_office office home', brand: 'Crucial', model: '8GB DDR4-3200MHz', specs: 'Single 8GB Stick 3200MHz CL22 Value RAM', stat_val: 'CL22 @ 3200MHz', stat_label: 'Memory Speed', badge: 'Budget Memory', price: 2240 },
    { type: 'ram', tier: 'mid', environment: 'home office esports', brand: 'Corsair', model: 'Vengeance 32GB DDR5-6000', specs: '2x16GB CL30 Low-Latency Dual Channel Kit', stat_val: 'CL30 @ 6000MHz', stat_label: 'Memory Speed', badge: 'Low Latency', price: 10490 },
    { type: 'ram', tier: 'high', environment: 'studio cloud edge', brand: 'G.Skill', model: 'Trident Z5 RGB 64GB DDR5-6400', specs: '2x32GB CL32 High-Capacity Extreme Speed Kit', stat_val: 'CL32 @ 6400MHz', stat_label: 'Memory Speed', badge: 'Creator Grade', price: 21990 },
    { type: 'ram', tier: 'enthusiast', environment: 'research datacenter', brand: 'Corsair', model: 'Dominator Titanium 128GB DDR5-6600', specs: '4x32GB CL32 Flagship Precision Kit', stat_val: 'CL32 @ 6600MHz', stat_label: 'Memory Speed', badge: 'Ultra Capacity', price: 49990 },

    // Storage
    { type: 'storage', tier: 'entry', environment: 'basic entry_office media', brand: 'Crucial', model: 'P3 256GB M.2 PCIe 3.0 NVMe', specs: '2400 MB/s Read, 1500 MB/s Write SSD', stat_val: '2,400 MB/s', stat_label: 'Read Speed', badge: 'Basic Storage', price: 2190 },
    { type: 'storage', tier: 'budget', environment: 'basic entry_office office home', brand: 'Crucial', model: 'P3 Plus 512GB M.2 Gen4 NVMe', specs: '5000 MB/s Read, 4200 MB/s Write SSD', stat_val: '5,000 MB/s', stat_label: 'Read Speed', badge: 'Budget Storage', price: 3490 },
    { type: 'storage', tier: 'mid', environment: 'home office esports', brand: 'Samsung', model: '990 PRO 2TB NVMe SSD', specs: 'PCIe 4.0 x4, 7450 MB/s Read, 6900 MB/s Write', stat_val: '7,450 MB/s', stat_label: 'Read Speed', badge: 'Gen4 Speed Leader', price: 16990 },
    { type: 'storage', tier: 'high', environment: 'studio cloud edge', brand: 'Crucial', model: 'T700 4TB Gen5 NVMe SSD', specs: 'PCIe 5.0 x4, 12400 MB/s Read, DirectStorage Optimized', stat_val: '12,400 MB/s', stat_label: 'Read Speed', badge: 'Gen5 Ultrafast', price: 42990 },
    { type: 'storage', tier: 'enthusiast', environment: 'research datacenter', brand: 'Samsung', model: '990 PRO 4TB Gen5 NVMe SSD', specs: 'PCIe 5.0 x4 enterprise endurance, 14000 MB/s Peak', stat_val: '14,000 MB/s', stat_label: 'Read Speed', badge: 'Data Enterprise', price: 34990 },

    // Case
    { type: 'case', tier: 'entry', environment: 'basic entry_office media', brand: 'Ant Esports', model: 'SI24 Micro-ATX Cabinet', specs: 'Compact mATX Tower, Front USB 3.0, Steel Side Panel', stat_val: 'Micro-ATX', stat_label: 'Form Factor', badge: 'Compact Slim', price: 1890 },
    { type: 'case', tier: 'budget', environment: 'basic entry_office office home', brand: 'Ant Esports', model: 'ICE-100 Mid Tower Cabinet', specs: 'Mid Tower, Front Mesh Panel, Auto RGB Fan', stat_val: 'Mid Tower', stat_label: 'Form Factor', badge: 'Budget Mesh', price: 3490 },
    { type: 'case', tier: 'mid', environment: 'home office esports', brand: 'Corsair', model: '4000D Airflow Tempered Glass', specs: 'High-airflow mesh front, 2x120mm PWM fans included', stat_val: 'Mid Tower', stat_label: 'Form Factor', badge: 'High Airflow', price: 8490 },
    { type: 'case', tier: 'high', environment: 'studio cloud edge', brand: 'Lian Li', model: 'O11 Dynamic EVO XL', specs: 'Dual-chamber design, reversible layout, 420mm radiator support', stat_val: 'Full Tower', stat_label: 'Form Factor', badge: 'Showcase Chassis', price: 21990 },
    { type: 'case', tier: 'enthusiast', environment: 'research datacenter', brand: 'Fractal', model: 'Torrent Black E-ATX High-Airflow', specs: '2x 180mm front PWM fans, open grille airflow layout', stat_val: 'Full Tower', stat_label: 'Form Factor', badge: 'Maximum Cooling', price: 18990 },

    // PSU
    { type: 'psu', tier: 'entry', environment: 'basic entry_office media', brand: 'Ant Esports', model: 'VS450L 450W Power Supply', specs: '450W Continuous Output, 120mm Silent Fan', stat_val: '450W Standard', stat_label: 'Power Supply', badge: 'Basic Power', price: 1690 },
    { type: 'psu', tier: 'budget', environment: 'basic entry_office office home', brand: 'Corsair', model: 'CV550 550W 80+ Bronze', specs: '550W Continuous Power, 80+ Bronze Efficiency', stat_val: '550W Bronze', stat_label: 'Power Supply', badge: 'Budget Bronze', price: 3890 },
    { type: 'psu', tier: 'mid', environment: 'home office esports', brand: 'Corsair', model: 'RM850x 850W 80+ Gold', specs: 'Fully modular, ATX 3.0 compliant, 135mm levitation fan', stat_val: '850W Gold', stat_label: 'Power Supply', badge: 'Silent & Efficient', price: 12490 },
    { type: 'psu', tier: 'high', environment: 'studio cloud edge', brand: 'Seasonic', model: 'VERTEX GX-1000 1000W 80+ Gold', specs: 'ATX 3.0 & PCIe 5.0 native 12VHPWR cable, Japanese 105C caps', stat_val: '1000W Gold', stat_label: 'Power Supply', badge: 'Pure Power', price: 19990 },
    { type: 'psu', tier: 'enthusiast', environment: 'research datacenter', brand: 'Corsair', model: 'AX1600i 1600W 80+ Titanium', specs: 'Digital PWM power control, Totem-pole PFC Gallium Nitride FETs', stat_val: '1600W Titanium', stat_label: 'Power Supply', badge: 'Ultimate Efficiency', price: 49990 }
  ];

  /* ---------------------------------------------------------- */
  /* 2. CSV FETCH & PARSER                                      */
  /* ---------------------------------------------------------- */
  async function loadHardwareDatabase() {
    try {
      const res = await fetch('hardware_data.csv');
      if (!res.ok) throw new Error('CSV fetch failed: ' + res.status);
      const text = await res.text();
      hardwareDatabase = parseCSV(text);
      console.log('[HW-DB] Loaded', hardwareDatabase.length, 'components from hardware_data.csv');
      recalculatePCBuilder();
    } catch (err) {
      console.warn('[HW-DB] Could not load CSV, using fallback static data.', err.message);
      hardwareDatabase = fallbackHardwareDatabase;
      recalculatePCBuilder();
    }
  }

  function parseCSV(text) {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = [];
      let inQuotes = false;
      let current = '';
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') { inQuotes = !inQuotes; continue; }
        if (ch === ',' && !inQuotes) { values.push(current.trim()); current = ''; continue; }
        current += ch;
      }
      values.push(current.trim());
      const obj = {};
      headers.forEach((h, i) => { obj[h] = values[i] || ''; });
      return obj;
    });
  }

  /* Query the database for the best matching component */
  function queryDB(type, tier, env) {
    if (!hardwareDatabase.length) return null;

    let targetTier = 'mid';
    if (typeof tier === 'string') {
      targetTier = tier;
    } else {
      const tierMap = { 0: 'entry', 1: 'budget', 2: 'mid', 3: 'high', 4: 'enthusiast' };
      targetTier = tierMap[tier] || 'mid';
    }

    let matches = hardwareDatabase.filter(r => r.type === type);

    // 1. Try exact tier + environment match
    let exactMatches = matches.filter(r => 
      (r.tier && r.tier.includes(targetTier)) && 
      (r.environment && r.environment.includes(env))
    );
    if (exactMatches.length > 0) return exactMatches[0];

    // 2. Try tier match across any environment
    let tierMatches = matches.filter(r => r.tier && r.tier.includes(targetTier));
    if (tierMatches.length > 0) return tierMatches[0];

    // 3. Try environment match
    let envMatches = matches.filter(r => r.environment && r.environment.includes(env));
    if (envMatches.length > 0) return envMatches[0];

    // 4. Fallback to first available item for type
    return matches.length > 0 ? matches[0] : null;
  }

  /* Query all matching components for a specific environment */
  function queryAllDB(type, env) {
    if (!hardwareDatabase.length) return [];
    let matches = hardwareDatabase.filter(r => r.type === type);
    let envMatches = matches.filter(r => r.environment && r.environment.includes(env));
    return envMatches.length > 0 ? envMatches : matches;
  }

  /* ---------------------------------------------------------- */
  /* 3. DOM REFERENCES                                          */
  /* ---------------------------------------------------------- */

  // Pill nav
  const siteHeader   = document.getElementById('siteHeader');
  const hideHeaderBtn = document.getElementById('hideHeaderBtn');
  const showHeaderBtn = document.getElementById('showHeaderBtn');

  // Nav links (pill version)
  const navLinks = document.querySelectorAll('.pnl');
  const sections = document.querySelectorAll('.page-section');

  // Theme
  const themeToggleBtn  = document.getElementById('themeToggleBtn');
  const systemModeLabel = document.getElementById('systemModeLabel');

  // Slider
  const sightsSlider = document.querySelector('.sights-slider');
  const prevBtn      = document.getElementById('sightPrevBtn');
  const nextBtn      = document.getElementById('sightNextBtn');

  // Modal
  const reportModal        = document.getElementById('reportModal');
  const openReportModalBtn = document.getElementById('openReportModalBtn');
  const closeReportModalBtn = document.getElementById('closeReportModalBtn');
  const downloadReportBtn  = document.getElementById('downloadReportBtn');
  const workloadSelect     = document.getElementById('workloadSelect');
  const budgetSelect       = document.getElementById('budgetSelect');
  const metricTdp          = document.getElementById('metricTdp');
  const metricBottleneck   = document.getElementById('metricBottleneck');
  const metricScore        = document.getElementById('metricScore');
  const specList           = document.getElementById('specList');

  // Builder Inputs
  const envSelect         = document.getElementById('envSelect');
  const useSelect         = document.getElementById('useSelect');
  const budgetRange       = document.getElementById('budgetRange');
  const budgetValue       = document.getElementById('budgetValue');
  const ramUpgradeSlider  = document.getElementById('ramUpgradeSlider');
  const ramSliderVal      = document.getElementById('ramSliderVal');
  const storageUpgradeSlider = document.getElementById('storageUpgradeSlider');
  const storageSliderVal  = document.getElementById('storageSliderVal');
  const gpuUpgradeSlider  = document.getElementById('gpuUpgradeSlider');
  const gpuSliderVal      = document.getElementById('gpuSliderVal');
  const cpuSelect         = document.getElementById('cpuSelect');

  // Builder Outputs
  const outTdp          = document.getElementById('outTdp');
  const outPsu          = document.getElementById('outPsu');
  const outRamBandwidth = document.getElementById('outRamBandwidth');
  const outStorageSpeed = document.getElementById('outStorageSpeed');
  const outNoise        = document.getElementById('outNoise');
  const outBottleneck   = document.getElementById('outBottleneck');
  const gaugeFps        = document.getElementById('gaugeFps');
  const numFps          = document.getElementById('numFps');
  const gaugeTokens     = document.getElementById('gaugeTokens');
  const numTokens       = document.getElementById('numTokens');
  const gaugeRender     = document.getElementById('gaugeRender');
  const numRender       = document.getElementById('numRender');

  // 7 Part Card bindings
  const partCards = {
    cpu:     { name: 'partNameCpu',     desc: 'partDescCpu',     stat: 'partStatCpu',     badge: 'partBadgeCpu',     img: 'partImgCpu',     price: 'partPriceCpu' },
    gpu:     { name: 'partNameGpu',     desc: 'partDescGpu',     stat: 'partStatGpu',     badge: 'partBadgeGpu',     img: 'partImgGpu',     price: 'partPriceGpu' },
    mobo:    { name: 'partNameMobo',    desc: 'partDescMobo',    stat: 'partStatMobo',    badge: 'partBadgeMobo',    img: 'partImgMobo',    price: 'partPriceMobo' },
    ram:     { name: 'partNameRam',     desc: 'partDescRam',     stat: 'partStatRam',     badge: 'partBadgeRam',     img: 'partImgRam',     price: 'partPriceRam' },
    storage: { name: 'partNameStorage', desc: 'partDescStorage', stat: 'partStatStorage', badge: 'partBadgeStorage', img: 'partImgStorage', price: 'partPriceStorage' },
    case:    { name: 'partNameCase',    desc: 'partDescCase',    stat: 'partStatCase',    badge: 'partBadgeCase',    img: 'partImgCase',    price: 'partPriceCase' },
    psu:     { name: 'partNamePsu',     desc: 'partDescPsu',     stat: 'partStatPsu',     badge: 'partBadgePsu',     img: 'partImgPsu',     price: 'partPricePsu' }
  };

  /* ---------------------------------------------------------- */
  /* 4. BUILDER STATE                                           */
  /* ---------------------------------------------------------- */
  let selectedEnv        = 'basic';
  let selectedUse        = 'basic_web';
  let currentBudget      = 25000;
  let currentRamGB       = 4;
  let currentStorageStep = 1;
  let currentGpuTier     = 0;
  let selectedCpuModel   = null;

  const gpuLabels = {
    0: 'Integrated Graphics (iGPU)',
    1: 'GTX 1650 / RTX 3050 (6GB)',
    2: 'RTX 4060 Ti (8GB)',
    3: 'RTX 4080 Super (16GB)',
    4: 'RTX 4090 (24GB)'
  };

  const storageLabels = {
    1: '256 GB NVMe SSD',
    2: '512 GB NVMe SSD',
    3: '1 TB Gen4 NVMe SSD',
    4: '2 TB Gen4 NVMe SSD',
    5: '4 TB Gen5 NVMe SSD',
    6: '8 TB Enterprise NVMe'
  };

  /* ---------------------------------------------------------- */
  /* BRAND & TYPE DYNAMIC HARDWARE IMAGES                      */
  /* ---------------------------------------------------------- */
  const componentBrandImages = {
    cpu: {
      intel: 'assets/cpu.png',
      amd:   'assets/cpu.png',
      default: 'assets/cpu.png'
    },
    gpu: {
      nvidia: 'assets/gpu.png',
      amd:    'assets/gpu.png',
      default: 'assets/gpu.png'
    },
    mobo: {
      asus:     'assets/mobo.png',
      msi:      'assets/mobo.png',
      gigabyte: 'assets/mobo.png',
      default:  'assets/mobo.png'
    },
    ram: {
      corsair:  'assets/ram.png',
      gskill:   'assets/ram.png',
      'g.skill':'assets/ram.png',
      kingston: 'assets/ram.png',
      crucial:  'assets/ram.png',
      default:  'assets/ram.png'
    },
    storage: {
      samsung: 'assets/storage.png',
      crucial: 'assets/storage.png',
      wd:      'assets/storage.png',
      default: 'assets/storage.png'
    },
    case: {
      corsair: 'assets/case.png',
      lianli:  'assets/case.png',
      'lian li':'assets/case.png',
      fractal: 'assets/case.png',
      'ant esports':'assets/case.png',
      default: 'assets/case.png'
    },
    psu: {
      corsair:  'assets/psu.png',
      seasonic: 'assets/psu.png',
      'ant esports':'assets/psu.png',
      default:  'assets/psu.png'
    }
  };

  function getComponentImage(type, brand, model) {
    const tKey = (type || '').toLowerCase();
    const bRaw = (brand || '').toLowerCase();
    const mRaw = (model || '').toLowerCase();

    if (tKey === 'cpu') {
      if (bRaw.includes('intel')) return 'assets/cpu_intel.png';
      if (bRaw.includes('amd'))   return 'assets/cpu_amd.png';
      return 'assets/cpu.png';
    }
    if (tKey === 'gpu') {
      if (mRaw.includes('4090')) return 'assets/gpu_rtx4090.png';
      return 'assets/gpu.png';
    }
    if (tKey === 'mobo') {
      if (mRaw.includes('godlike')) return 'assets/mobo_godlike.png';
      return 'assets/mobo.png';
    }
    return `assets/${tKey}.png`;
  }

  /* ---------------------------------------------------------- */
  /* 5. DYNAMIC RECOMMENDATION ENGINE (CSV-driven)             */
  /* ---------------------------------------------------------- */
  function updatePartCard(type, dbRow) {
    const ids = partCards[type];
    if (!ids) return;

    const nameEl  = document.getElementById(ids.name);
    const descEl  = document.getElementById(ids.desc);
    const statEl  = document.getElementById(ids.stat);
    const badgeEl = document.getElementById(ids.badge);
    const imgEl   = document.getElementById(ids.img);
    const priceEl = document.getElementById(ids.price);

    const cardEl  = nameEl ? nameEl.closest('.part-card') : null;
    if (cardEl) {
      cardEl.classList.remove('card-updating');
      void cardEl.offsetWidth; // trigger reflow for zoom inside animation
      cardEl.classList.add('card-updating');
    }

    if (dbRow) {
      if (nameEl)  nameEl.textContent  = `${dbRow.brand} ${dbRow.model}`;
      if (descEl)  descEl.textContent  = dbRow.specs || '';
      if (statEl)  statEl.textContent  = `${dbRow.stat_val} ${dbRow.stat_label}`;
      if (badgeEl) badgeEl.textContent = dbRow.badge || '';
      if (priceEl && dbRow.price !== undefined) {
        priceEl.textContent = dbRow.price === 0 ? 'Included with CPU' : `₹${parseInt(dbRow.price, 10).toLocaleString('en-IN')}`;
      }
      if (imgEl) {
        const customImg = getComponentImage(type, dbRow.brand, dbRow.model);
        if (customImg && imgEl.src !== customImg) {
          imgEl.src = customImg;
        }
      }
    }
  }

  function recalculatePCBuilder() {
    /* --- TDP & PSU calculation -------------------------------- */
    let baseTdp = 120;
    if (selectedUse === 'ai')             baseTdp += 220;
    if (selectedUse === 'rendering')      baseTdp += 180;
    if (selectedUse === 'gaming')         baseTdp += 150;
    if (selectedUse === 'dev')            baseTdp += 80;
    if (selectedUse === 'streaming')      baseTdp += 160;
    if (selectedUse === 'cad')            baseTdp += 130;
    if (selectedUse === 'crypto')         baseTdp += 240;
    if (selectedUse === 'bio')            baseTdp += 210;
    if (selectedUse === 'basic_web')      baseTdp += 20;
    if (selectedUse === 'office_docs')    baseTdp += 30;
    if (selectedUse === 'media_playback') baseTdp += 40;

    baseTdp += (currentRamGB / 16) * 15;
    baseTdp += currentStorageStep * 5;
    baseTdp += currentGpuTier * 90;

    const recommendedPsu = Math.max(450, Math.ceil((baseTdp * 1.3) / 50) * 50);
    const stSpeed = storageLabels[currentStorageStep] || '256 GB NVMe SSD';

    /* --- Output text ------------------------------------------ */
    if (outTdp)          outTdp.textContent          = `${baseTdp} Watts`;
    if (outPsu)          outPsu.textContent          = `${recommendedPsu}W 80+ Efficiency`;
    if (outRamBandwidth) outRamBandwidth.textContent = `${(currentRamGB >= 64 ? 128.0 : (currentRamGB <= 8 ? 25.6 : 96.0)).toFixed(1)} GB/s (${currentRamGB <= 8 ? 'DDR4' : 'DDR5 Dual Channel'})`;
    if (outStorageSpeed) outStorageSpeed.textContent = stSpeed;
    if (outNoise)        outNoise.textContent        = (selectedEnv === 'datacenter' || selectedEnv === 'research')
      ? '54 dB (High Airflow)' : (baseTdp > 500 ? '34 dB (Liquid Cooled)' : '22 dB (Ultra Quiet)');
    if (outBottleneck)   outBottleneck.textContent   = `${Math.max(0.8, 6.5 - (currentGpuTier * 1.2) - (currentRamGB / 32)).toFixed(1)}% (Optimal Balance)`;

    /* --- Performance gauges ----------------------------------- */
    const fpsVal    = Math.min(240, Math.floor(30 + currentGpuTier * 40 + (currentRamGB / 16) * 5));
    const tokenVal  = Math.min(120, Math.floor(5 + currentGpuTier * 22 + (currentRamGB / 32) * 10));
    const renderVal = (0.8 + currentGpuTier * 2.2 + (currentRamGB / 32) * 1.2).toFixed(1);

    if (gaugeFps)    { gaugeFps.style.width    = `${Math.min(100, (fpsVal / 240) * 100)}%`;   numFps.textContent    = `${fpsVal} FPS`; }
    if (gaugeTokens) { gaugeTokens.style.width = `${Math.min(100, (tokenVal / 120) * 100)}%`; numTokens.textContent = `${tokenVal} tok/s`; }
    if (gaugeRender) { gaugeRender.style.width = `${Math.min(100, (renderVal / 12) * 100)}%`;  numRender.textContent = `${renderVal}x Speed`; }

    /* --- Dynamic 7-component recommendations from hardwareDatabase --- */
    let tier = 'mid';
    if (currentBudget <= 40000 && currentGpuTier === 0) {
      tier = 'entry';
    } else if (currentBudget <= 90000 || currentGpuTier === 1) {
      tier = 'budget';
    } else if (currentBudget <= 180000 || currentGpuTier === 2) {
      tier = 'mid';
    } else if (currentBudget <= 350000 || currentGpuTier === 3) {
      tier = 'high';
    } else {
      tier = 'enthusiast';
    }

    // Query each component from the CSV-driven database
    const cpuRow     = queryDB('cpu',     tier, selectedEnv);
    const gpuRow     = queryDB('gpu',     tier, selectedEnv);
    const moboRow    = queryDB('mobo',    tier, selectedEnv);
    const ramRow     = queryDB('ram',     tier, selectedEnv);
    const storageRow = queryDB('storage', tier, selectedEnv);
    const caseRow    = queryDB('case',    tier, selectedEnv);
    const psuRow     = queryDB('psu',     tier, selectedEnv);

    // Query all CPUs available for current environment & populate dropdown
    const availableCpus = queryAllDB('cpu', selectedEnv);
    let activeCpuRow = cpuRow;

    if (cpuSelect) {
      cpuSelect.innerHTML = '';
      availableCpus.forEach((c, idx) => {
        const opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = `${c.brand} ${c.model} (${c.badge || 'CPU'})`;
        if (selectedCpuModel && c.model === selectedCpuModel) {
          opt.selected = true;
          activeCpuRow = c;
        } else if (!selectedCpuModel && c.model === cpuRow?.model) {
          opt.selected = true;
          activeCpuRow = c;
        }
        cpuSelect.appendChild(opt);
      });
    }

    if (activeCpuRow) {
      updatePartCard('cpu', activeCpuRow);
      const wattsMatch = activeCpuRow.stat_val ? activeCpuRow.stat_val.match(/(\d+)W/i) : null;
      if (wattsMatch) {
        const cpuWatts = parseInt(wattsMatch[1], 10);
        const dynamicTdp = baseTdp + (cpuWatts - 60);
        const dynamicPsu = Math.max(450, Math.ceil((dynamicTdp * 1.3) / 50) * 50);
        if (outTdp) outTdp.textContent = `${dynamicTdp} Watts`;
        if (outPsu) outPsu.textContent = `${dynamicPsu}W Power Supply`;
      }
    }

    if (gpuRow)     updatePartCard('gpu', gpuRow);
    if (moboRow)    updatePartCard('mobo', moboRow);
    if (storageRow) updatePartCard('storage', storageRow);
    if (caseRow)    updatePartCard('case', caseRow);
    if (psuRow)     updatePartCard('psu', psuRow);

    // RAM: override with live slider value
    const ramEl = partCards.ram;
    const ramNameEl = document.getElementById(ramEl.name);
    const ramDescEl = document.getElementById(ramEl.desc);
    const ramStatEl = document.getElementById(ramEl.stat);
    const ramBadgeEl = document.getElementById(ramEl.badge);
    const ramImgEl = document.getElementById(ramEl.img);
    const ramPriceEl = document.getElementById(ramEl.price);

    const ramTypeStr = currentRamGB <= 8 ? 'DDR4' : 'DDR5';
    const ramPriceCalc = currentRamGB <= 8 ? (currentRamGB * 280) : (currentRamGB * 328);

    if (ramRow) {
      if (ramNameEl)  ramNameEl.textContent  = `${currentRamGB}GB ${ramRow.brand} ${ramRow.model.replace(/\d+GB/i, '').trim()}`;
      if (ramDescEl)  ramDescEl.textContent  = `${currentRamGB <= 8 ? 'Single-Channel Value Kit' : ramRow.specs}`;
      if (ramStatEl)  ramStatEl.textContent  = `${currentRamGB <= 8 ? 'CL22 @ 3200MHz' : ramRow.stat_val}`;
      if (ramBadgeEl) ramBadgeEl.textContent = `${currentRamGB <= 8 ? 'Basic RAM' : ramRow.badge}`;
      if (ramPriceEl) ramPriceEl.textContent = `₹${ramPriceCalc.toLocaleString('en-IN')}`;
      if (ramImgEl)   ramImgEl.src           = getComponentImage('ram', ramRow.brand);
    } else {
      if (ramNameEl)  ramNameEl.textContent  = `${currentRamGB}GB ${ramTypeStr}`;
      if (ramDescEl)  ramDescEl.textContent  = 'Reliable System Memory';
      if (ramStatEl)  ramStatEl.textContent  = `${currentRamGB <= 8 ? 'CL22 @ 3200MHz' : 'CL30 @ 6000MHz'}`;
      if (ramBadgeEl) ramBadgeEl.textContent = 'System RAM';
      if (ramPriceEl) ramPriceEl.textContent = `₹${ramPriceCalc.toLocaleString('en-IN')}`;
      if (ramImgEl)   ramImgEl.src           = getComponentImage('ram', 'crucial');
    }

    // Storage: override description with live slider selection
    const stDescEl = document.getElementById(partCards.storage.desc);
    if (stDescEl) stDescEl.textContent = stSpeed;
    const stPriceEl = document.getElementById(partCards.storage.price);
    const stPriceCalc = currentStorageStep === 1 ? 2190 : currentStorageStep === 2 ? 3490 : (currentStorageStep * 7990);
    if (stPriceEl) stPriceEl.textContent = `₹${stPriceCalc.toLocaleString('en-IN')}`;

    // PSU: override name with calculated wattage
    const psuNameEl = document.getElementById(partCards.psu.name);
    if (!psuRow && psuNameEl) {
      psuNameEl.textContent = `${recommendedPsu}W Power Supply`;
    } else if (psuRow && psuNameEl) {
      psuNameEl.textContent = `${recommendedPsu}W ${psuRow.brand} ${psuRow.model.split(' ')[0]}`;
    }

    // Sum up total build cost across all 7 active components
    let totalBuildCost = 0;
    const cpuPrice = activeCpuRow?.price || 7990;
    const gpuPrice = currentGpuTier === 0 ? 0 : (gpuRow?.price || 59990);
    const moboPrice = moboRow?.price || 6490;
    const ramPrice = ramPriceCalc;
    const storagePrice = stPriceCalc;
    const casePrice = caseRow?.price || 1890;
    const psuPrice = psuRow?.price || 1690;

    totalBuildCost = cpuPrice + gpuPrice + moboPrice + ramPrice + storagePrice + casePrice + psuPrice;
    const outTotalPrice = document.getElementById('outTotalPrice');
    if (outTotalPrice) {
      outTotalPrice.textContent = `₹${totalBuildCost.toLocaleString('en-IN')}`;
    }
  }

  /* ---------------------------------------------------------- */
  /* 6. EVENT BINDINGS & ENVIRONMENT PRESETS                   */
  /* ---------------------------------------------------------- */

  const envPresets = {
    basic:        { budget: 25000,  ram: 4,   storage: 1, gpuTier: 0, use: 'basic_web' },
    entry_office: { budget: 35000,  ram: 8,   storage: 2, gpuTier: 0, use: 'office_docs' },
    media:        { budget: 45000,  ram: 8,   storage: 3, gpuTier: 0, use: 'media_playback' },
    home:         { budget: 200000, ram: 32,  storage: 4, gpuTier: 3, use: 'gaming' },
    office:       { budget: 80000,  ram: 16,  storage: 3, gpuTier: 1, use: 'cad' },
    studio:       { budget: 300000, ram: 64,  storage: 5, gpuTier: 3, use: 'rendering' },
    esports:      { budget: 150000, ram: 32,  storage: 4, gpuTier: 2, use: 'streaming' },
    edge:         { budget: 250000, ram: 64,  storage: 4, gpuTier: 3, use: 'ai' },
    cloud:        { budget: 220000, ram: 64,  storage: 5, gpuTier: 2, use: 'dev' },
    research:     { budget: 450000, ram: 128, storage: 6, gpuTier: 4, use: 'bio' },
    datacenter:   { budget: 400000, ram: 128, storage: 6, gpuTier: 4, use: 'crypto' }
  };

  // Environment Select Dropdown
  if (envSelect) {
    envSelect.addEventListener('change', () => {
      selectedEnv = envSelect.value;
      selectedCpuModel = null; // Reset to pick default CPU for new environment

      // Dynamically adapt all hardware sliders & use preset based on selected environment
      const preset = envPresets[selectedEnv];
      if (preset) {
        if (preset.budget && budgetRange) {
          currentBudget = preset.budget;
          budgetRange.value = currentBudget;
          if (budgetValue) budgetValue.textContent = `₹${currentBudget.toLocaleString('en-IN')}`;
        }
        if (preset.ram && ramUpgradeSlider) {
          currentRamGB = preset.ram;
          ramUpgradeSlider.value = currentRamGB;
          if (ramSliderVal) ramSliderVal.textContent = `${currentRamGB} GB ${currentRamGB <= 8 ? 'DDR4' : 'DDR5'}`;
        }
        if (preset.storage && storageUpgradeSlider) {
          currentStorageStep = preset.storage;
          storageUpgradeSlider.value = currentStorageStep;
          if (storageSliderVal) storageSliderVal.textContent = storageLabels[currentStorageStep] || '256 GB NVMe SSD';
        }
        if (preset.gpuTier !== undefined && gpuUpgradeSlider) {
          currentGpuTier = preset.gpuTier;
          gpuUpgradeSlider.value = currentGpuTier;
          if (gpuSliderVal) gpuSliderVal.textContent = gpuLabels[currentGpuTier];
        }
        if (preset.use && useSelect) {
          selectedUse = preset.use;
          useSelect.value = selectedUse;
        }
      }

      recalculatePCBuilder();
    });
  }

  // Target Primary Use Select Dropdown
  if (useSelect) {
    useSelect.addEventListener('change', () => {
      selectedUse = useSelect.value;
      recalculatePCBuilder();
    });
  }

  // CPU Dropdown Selector
  if (cpuSelect) {
    cpuSelect.addEventListener('change', e => {
      const availableCpus = queryAllDB('cpu', selectedEnv);
      const chosenIdx = parseInt(e.target.value, 10);
      if (availableCpus[chosenIdx]) {
        selectedCpuModel = availableCpus[chosenIdx].model;
        recalculatePCBuilder();
      }
    });
  }

  // Budget range
  if (budgetRange) {
    budgetRange.addEventListener('input', e => {
      currentBudget = parseInt(e.target.value, 10);
      if (budgetValue) budgetValue.textContent = `₹${currentBudget.toLocaleString('en-IN')}`;
      recalculatePCBuilder();
    });
  }

  // RAM slider
  if (ramUpgradeSlider) {
    ramUpgradeSlider.addEventListener('input', e => {
      currentRamGB = parseInt(e.target.value, 10);
      if (ramSliderVal) ramSliderVal.textContent = `${currentRamGB} GB ${currentRamGB <= 8 ? 'DDR4' : 'DDR5'}`;
      recalculatePCBuilder();
    });
  }

  // Storage slider
  if (storageUpgradeSlider) {
    storageUpgradeSlider.addEventListener('input', e => {
      currentStorageStep = parseInt(e.target.value, 10);
      if (storageSliderVal) storageSliderVal.textContent = storageLabels[currentStorageStep] || '256 GB NVMe SSD';
      recalculatePCBuilder();
    });
  }

  // GPU tier slider
  if (gpuUpgradeSlider) {
    gpuUpgradeSlider.addEventListener('input', e => {
      currentGpuTier = parseInt(e.target.value, 10);
      if (gpuSliderVal) gpuSliderVal.textContent = gpuLabels[currentGpuTier];
      recalculatePCBuilder();
    });
  }

  /* ---------------------------------------------------------- */
  /* 7. PILL NAVIGATION — HIDE / SHOW                          */
  /* ---------------------------------------------------------- */
  if (hideHeaderBtn && siteHeader && showHeaderBtn) {
    hideHeaderBtn.addEventListener('click', () => {
      siteHeader.classList.add('hidden');
      showHeaderBtn.classList.add('visible');
    });
    showHeaderBtn.addEventListener('click', () => {
      siteHeader.classList.remove('hidden');
      showHeaderBtn.classList.remove('visible');
    });
  }

  /* ---------------------------------------------------------- */
  /* 8. ACTIVE NAV HIGHLIGHT, PARALLAX DRIFT & PROGRESS BAR   */
  /* ---------------------------------------------------------- */
  const scrollProgressFill = document.getElementById('scrollProgressFill');
  const heroWords = document.querySelectorAll('.hero-word');

  window.addEventListener('scroll', () => {
    // 1. Scroll Progress Bar
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled  = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollProgressFill) {
      scrollProgressFill.style.width = `${scrolled}%`;
    }

    // 2. Hero Parallax Drift
    if (winScroll < window.innerHeight) {
      heroWords.forEach((word, idx) => {
        const factor = (idx + 1) * 0.15;
        word.style.transform = `translateY(${winScroll * factor}px)`;
      });
    }

    // 3. Active Nav Link
    let currentId = sections[0] ? sections[0].getAttribute('id') : 'cinema';
    const scrollPos = window.scrollY + 250;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === currentId) link.classList.add('active');
    });
  }, { passive: true });

  /* ---------------------------------------------------------- */
  /* 9. THEME SWITCHER                                          */
  /* ---------------------------------------------------------- */
  const themes = ['', 'theme-matrix', 'theme-amber', 'theme-violet'];
  const themeLabels = ['v1.0 Cyan', 'v1.1 Matrix', 'v1.2 Amber', 'v1.3 Violet'];
  let themeIdx = 0;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (themes[themeIdx]) document.body.classList.remove(themes[themeIdx]);
      themeIdx = (themeIdx + 1) % themes.length;
      if (themes[themeIdx]) document.body.classList.add(themes[themeIdx]);
      if (systemModeLabel) systemModeLabel.textContent = themeLabels[themeIdx];
    });
  }

  /* ---------------------------------------------------------- */
  /* 10. SPECS SLIDER NAVIGATION                               */
  /* ---------------------------------------------------------- */
  if (prevBtn && nextBtn && sightsSlider) {
    prevBtn.addEventListener('click', e => { e.stopPropagation(); sightsSlider.scrollBy({ left: -350, behavior: 'smooth' }); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); sightsSlider.scrollBy({ left: 350, behavior: 'smooth' }); });
  }

  /* ---------------------------------------------------------- */
  /* 11. SCROLL REVEAL INTERSECTION OBSERVER                   */
  /* ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, no need to keep observing
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  // Observe all reveal animation targets
  document.querySelectorAll('.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in, .reveal-flip-x, .story-panel, .sight-card, .part-card').forEach(el => {
    revealObserver.observe(el);
  });

  /* ---------------------------------------------------------- */
  /* 11b. DYNAMIC 3D TILT & DEEP ZOOM INTERACTION              */
  /* ---------------------------------------------------------- */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---------------------------------------------------------- */
  /* 12. 3D PARTICLE CANVAS                                    */
  /* ---------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas ? canvas.getContext('2d') : null;
  let particles = [];

  function initParticles() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    const count = Math.floor(window.innerWidth / 18);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 2 + 0.5,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.5 + 0.15
      });
    }
  }

  function drawParticles() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width)  p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(74,181,224,${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#4ab5e0';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x, dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(74,181,224,${(1 - dist / 110) * 0.2})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  window.addEventListener('resize', initParticles, { passive: true });
  initParticles();
  requestAnimationFrame(drawParticles);

  /* ---------------------------------------------------------- */
  /* 13. 3D MOUSE PARALLAX TILT                                */
  /* ---------------------------------------------------------- */
  document.addEventListener('mousemove', e => {
    const mx = (e.clientX / window.innerWidth - 0.5) * 8;
    const my = (e.clientY / window.innerHeight - 0.5) * -8;
    document.querySelectorAll('.tilt-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        card.style.transform = `perspective(1000px) rotateX(${my.toFixed(2)}deg) rotateY(${mx.toFixed(2)}deg)`;
      }
    });
  }, { passive: true });

  /* ---------------------------------------------------------- */
  /* 14. MODAL — OPEN / CLOSE / BACKDROP                       */
  /* ---------------------------------------------------------- */
  if (openReportModalBtn && reportModal && closeReportModalBtn) {
    openReportModalBtn.addEventListener('click', () => {
      reportModal.classList.add('open');
      reportModal.setAttribute('aria-hidden', 'false');
      updateModalContent();
    });

    closeReportModalBtn.addEventListener('click', () => {
      reportModal.classList.remove('open');
      reportModal.setAttribute('aria-hidden', 'true');
    });

    reportModal.addEventListener('click', e => {
      if (e.target === reportModal) {
        reportModal.classList.remove('open');
        reportModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function updateModalContent() {
    if (metricTdp)        metricTdp.textContent        = outTdp ? outTdp.textContent : '';
    if (metricBottleneck) metricBottleneck.textContent = outBottleneck ? outBottleneck.textContent : '';
    if (metricScore)      metricScore.textContent      = `${Math.min(100, 90 + currentGpuTier * 2)} / 100`;

    // All 7 components in the modal spec list
    const cpu     = document.getElementById('partNameCpu')?.textContent     || '';
    const cpuDesc = document.getElementById('partDescCpu')?.textContent     || '';
    const gpu     = document.getElementById('partNameGpu')?.textContent     || '';
    const gpuDesc = document.getElementById('partDescGpu')?.textContent     || '';
    const mobo    = document.getElementById('partNameMobo')?.textContent    || '';
    const ram     = document.getElementById('partNameRam')?.textContent     || '';
    const storage = document.getElementById('partNameStorage')?.textContent || '';
    const pcCase  = document.getElementById('partNameCase')?.textContent    || '';
    const psu     = document.getElementById('partNamePsu')?.textContent     || '';

    if (specList) {
      specList.innerHTML = `
        <li><strong>CPU:</strong> ${cpu} — ${cpuDesc}</li>
        <li><strong>GPU:</strong> ${gpu} — ${gpuDesc}</li>
        <li><strong>Motherboard:</strong> ${mobo}</li>
        <li><strong>RAM:</strong> ${ram}</li>
        <li><strong>Storage:</strong> ${storage} (${outStorageSpeed ? outStorageSpeed.textContent : ''})</li>
        <li><strong>Case:</strong> ${pcCase}</li>
        <li><strong>PSU &amp; Thermal:</strong> ${psu}</li>
      `;
    }
  }

  /* ---------------------------------------------------------- */
  /* 15. DOWNLOAD FULL 7-COMPONENT REPORT                      */
  /* ---------------------------------------------------------- */
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener('click', () => {
      const g   = id => document.getElementById(id)?.textContent || '';
      const now = new Date().toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' });
      const score = Math.min(100, 90 + currentGpuTier * 2);

      const rows = [
        { icon: '🖥', label: 'Processor (CPU)',      name: g('partNameCpu'),     desc: g('partDescCpu'),     stat: g('partStatCpu'),     badge: g('partBadgeCpu'),     price: g('partPriceCpu') },
        { icon: '🎮', label: 'Graphics (GPU)',        name: g('partNameGpu'),     desc: g('partDescGpu'),     stat: g('partStatGpu'),     badge: g('partBadgeGpu'),     price: g('partPriceGpu') },
        { icon: '🔌', label: 'Motherboard',           name: g('partNameMobo'),    desc: g('partDescMobo'),    stat: g('partStatMobo'),    badge: g('partBadgeMobo'),    price: g('partPriceMobo') },
        { icon: '💾', label: 'System Memory (RAM)',   name: g('partNameRam'),     desc: g('partDescRam'),     stat: g('partStatRam'),     badge: g('partBadgeRam'),     price: g('partPriceRam') },
        { icon: '⚡', label: 'High-Speed Storage',    name: g('partNameStorage'), desc: g('partDescStorage'), stat: g('partStatStorage'), badge: g('partBadgeStorage'), price: g('partPriceStorage') },
        { icon: '🗄', label: 'Chassis / Case',        name: g('partNameCase'),    desc: g('partDescCase'),    stat: g('partStatCase'),    badge: g('partBadgeCase'),    price: g('partPriceCase') },
        { icon: '🔋', label: 'Power & Cooling (PSU)', name: g('partNamePsu'),     desc: g('partDescPsu'),     stat: g('partStatPsu'),     badge: g('partBadgePsu'),     price: g('partPricePsu') },
      ];

      const componentRows = rows.map((r, i) => `
        <tr class="${i % 2 === 0 ? 'row-even' : 'row-odd'}">
          <td class="td-icon">${r.icon}</td>
          <td class="td-label">${r.label}</td>
          <td class="td-name"><strong>${r.name}</strong><br><span class="td-desc">${r.desc}</span></td>
          <td class="td-stat">${r.stat}</td>
          <td class="td-badge"><span class="badge">${r.badge}</span></td>
          <td class="td-stat" style="color:#4ab5e0;font-weight:bold;">${r.price}</td>
        </tr>`).join('');

      const metricCards = [
        { label: 'Est. Total Build Cost', value: g('outTotalPrice')   },
        { label: 'Estimated TDP',       value: g('outTdp')          },
        { label: 'Recommended PSU',     value: g('outPsu')          },
        { label: 'Memory Bandwidth',    value: g('outRamBandwidth') },
        { label: 'Storage Throughput',  value: g('outStorageSpeed') },
        { label: 'Thermal / Fan Noise', value: g('outNoise')        },
        { label: 'Bottleneck Ratio',    value: g('outBottleneck')   },
        { label: 'Efficiency Score',    value: score + ' / 100'     },
      ].map(m => `<div class="metric-card"><div class="mc-label">${m.label}</div><div class="mc-val">${m.value}</div></div>`).join('');

      const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>' +
        '<title>Hardware Diagnostic Report — Vijay Bhaskar Reddy</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">' +
        '<style>' +
        '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}' +
        'body{font-family:"Readex Pro",system-ui,sans-serif;background:#fff;color:#0a0f1e;font-size:10.5pt;line-height:1.55}' +
        '.page{max-width:780px;margin:0 auto;padding:32px 40px 48px}' +
        '.watermark{background:#0a0f1e;color:#4ab5e0;font-family:"JetBrains Mono",monospace;font-size:7pt;letter-spacing:.2em;text-transform:uppercase;text-align:center;padding:7px 0;margin-bottom:28px}' +
        '.hdr{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #0a0f1e;padding-bottom:14px;margin-bottom:22px}' +
        '.hdr-left{display:flex;align-items:center;gap:12px}' +
        '.hdr-logo{width:36px;height:36px}' +
        '.hdr-title{font-size:14pt;font-weight:700;line-height:1.15}' +
        '.hdr-sub{font-family:"JetBrains Mono",monospace;font-size:7.5pt;color:#4ab5e0;text-transform:uppercase;letter-spacing:.08em;margin-top:3px}' +
        '.hdr-meta{text-align:right;font-size:7.5pt;color:#555;font-family:"JetBrains Mono",monospace;line-height:1.75}' +
        '.sec{font-size:7.5pt;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#4ab5e0;border-bottom:1px solid #4ab5e0;padding-bottom:4px;margin:20px 0 10px}' +
        '.cfg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:4px}' +
        '.cfg{background:#f4f8fb;border-radius:7px;padding:8px 12px}' +
        '.cfg-l{font-size:7pt;color:#4ab5e0;font-family:"JetBrains Mono",monospace;text-transform:uppercase;letter-spacing:.09em}' +
        '.cfg-v{font-size:9.5pt;font-weight:600;margin-top:2px}' +
        '.metrics-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:4px}' +
        '.metric-card{background:#f4f8fb;border-left:3px solid #4ab5e0;border-radius:6px;padding:8px 10px}' +
        '.mc-label{font-size:7pt;color:#888;font-family:"JetBrains Mono",monospace;text-transform:uppercase;letter-spacing:.06em}' +
        '.mc-val{font-size:9.5pt;font-weight:700;color:#0a0f1e;margin-top:2px}' +
        'table{width:100%;border-collapse:collapse;font-size:9pt}' +
        'th{background:#0a0f1e;color:#fff;font-family:"JetBrains Mono",monospace;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;padding:8px 10px;text-align:left}' +
        'td{padding:8px 10px;vertical-align:top}' +
        '.row-even{background:#f9fbfd}.row-odd{background:#fff}' +
        'tr:not(:last-child) td{border-bottom:1px solid #eef1f5}' +
        '.td-icon{font-size:14pt;text-align:center;width:34px}' +
        '.td-label{color:#4ab5e0;font-weight:600;font-size:8pt;width:125px}' +
        '.td-name strong{font-weight:700;font-size:9.5pt}.td-desc{color:#777;font-size:7.5pt}' +
        '.td-stat{color:#555;font-family:"JetBrains Mono",monospace;font-size:7.5pt;width:105px}' +
        '.badge{background:#0a0f1e;color:#4ab5e0;font-family:"JetBrains Mono",monospace;font-size:6.5pt;letter-spacing:.07em;text-transform:uppercase;padding:2px 7px;border-radius:99px;white-space:nowrap}' +
        '.ftr{margin-top:28px;border-top:2px solid #0a0f1e;padding-top:12px;display:flex;justify-content:space-between;font-size:7pt;color:#888;font-family:"JetBrains Mono",monospace}' +
        '.ftr-brand{font-weight:700;color:#0a0f1e}' +
        '.print-btn{display:block;margin:22px auto 0;padding:10px 30px;background:#0a0f1e;color:#4ab5e0;font-family:"JetBrains Mono",monospace;font-size:8.5pt;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:99px;cursor:pointer}' +
        '.print-btn:hover{background:#4ab5e0;color:#0a0f1e}' +
        '@media print{.print-btn{display:none!important}@page{margin:18mm 16mm;size:A4 portrait}}' +
        '</style></head><body>' +
        '<div class="watermark">Hardware Diagnostic Report — Vijay Bhaskar Reddy — Confidential</div>' +
        '<div class="page">' +
        '<div class="hdr">' +
        '<div class="hdr-left">' +
        '<svg class="hdr-logo" viewBox="0 0 256 256" fill="none">' +
        '<path d="M128 192L128 256L64.5 256L32 223L0 192L0 128L64 128Z" fill="#4ab5e0"/>' +
        '<path d="M256 192L256 256L192.5 256L160 223L128 192L128 128L192 128Z" fill="#4ab5e0" opacity=".7"/>' +
        '<path d="M128 64L128 128L64.5 128L32 95L0 64L0 0L64 0Z" fill="#4ab5e0" opacity=".9"/>' +
        '<path d="M256 64L256 128L192.5 128L160 95L128 64L128 0L192 0Z" fill="#4ab5e0" opacity=".5"/>' +
        '</svg>' +
        '<div><div class="hdr-title">Hardware Performance Diagnostic Report</div>' +
        '<div class="hdr-sub">Computer Recommendation &amp; Performance Analysis System — Vijay Bhaskar Reddy</div></div>' +
        '</div>' +
        '<div class="hdr-meta"><strong>Vijay Bhaskar Reddy</strong><br>Generated: ' + now + '<br>Budget: &#8377;' + currentBudget.toLocaleString('en-IN') + '<br>Environment: ' + selectedEnv.toUpperCase() + '</div>' +
        '</div>' +
        '<div class="sec">Build Configuration</div>' +
        '<div class="cfg-grid">' +
        '<div class="cfg"><div class="cfg-l">Environment</div><div class="cfg-v">' + selectedEnv.charAt(0).toUpperCase() + selectedEnv.slice(1) + '</div></div>' +
        '<div class="cfg"><div class="cfg-l">Primary Use</div><div class="cfg-v">' + selectedUse.toUpperCase() + '</div></div>' +
        '<div class="cfg"><div class="cfg-l">Budget Target</div><div class="cfg-v">&#8377;' + currentBudget.toLocaleString('en-IN') + '</div></div>' +
        '<div class="cfg"><div class="cfg-l">RAM Capacity</div><div class="cfg-v">' + currentRamGB + ' GB ' + (currentRamGB <= 8 ? 'DDR4' : 'DDR5') + '</div></div>' +
        '<div class="cfg"><div class="cfg-l">Storage</div><div class="cfg-v">' + (storageLabels[currentStorageStep] || '256 GB NVMe') + '</div></div>' +
        '<div class="cfg"><div class="cfg-l">GPU Tier</div><div class="cfg-v">' + gpuLabels[currentGpuTier] + '</div></div>' +
        '</div>' +
        '<div class="sec">Performance Metrics</div>' +
        '<div class="metrics-row">' + metricCards + '</div>' +
        '<div class="sec">Recommended Components — 7-Component Build</div>' +
        '<table><thead><tr><th></th><th>Component</th><th>Model &amp; Specifications</th><th>Key Stat</th><th>Badge</th></tr></thead>' +
        '<tbody>' + componentRows + '</tbody></table>' +
        '<div class="ftr">' +
        '<div><span class="ftr-brand">Vijay Bhaskar Reddy</span><br>Computer Hardware &amp; Performance Analysis System — ' + new Date().getFullYear() + '</div>' +
        '<div style="text-align:right">Efficiency Score: <strong style="color:#0a0f1e">' + score + '/100</strong><br>Bottleneck: <strong style="color:#0a0f1e">' + g('outBottleneck') + '</strong></div>' +
        '</div>' +
        '<button class="print-btn" onclick="window.print()">&#8659; Save as PDF / Print</button>' +
        '</div>' +
        '<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},700);});<\/script>' +
        '</body></html>';

      const win = window.open('', '_blank', 'width=840,height=1060,scrollbars=yes');
      if (win) { win.document.write(html); win.document.close(); }
      else { alert('Please allow pop-ups for this page to generate the PDF report.'); }
    });
  }



  /* ---------------------------------------------------------- */
  /* 16. INIT                                                   */
  /* ---------------------------------------------------------- */
  // Load CSV database, then run first recommendation pass
  loadHardwareDatabase();

  // Keyboard: Escape closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && reportModal && reportModal.classList.contains('open')) {
      reportModal.classList.remove('open');
      reportModal.setAttribute('aria-hidden', 'true');
    }
  });

})();
