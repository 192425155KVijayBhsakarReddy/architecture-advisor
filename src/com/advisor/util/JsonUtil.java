package com.advisor.util;

import com.advisor.model.BuildReport;
import com.advisor.model.HardwareComponent;

import java.util.*;

/**
 * Lightweight zero-dependency JSON parser & serializer in Java.
 */
public class JsonUtil {

    public static String toJson(HardwareComponent c) {
        if (c == null) return "null";
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"type\":").append(escape(c.getType())).append(",");
        sb.append("\"tier\":").append(escape(c.getTier())).append(",");
        sb.append("\"environment\":").append(escape(c.getEnvironment())).append(",");
        sb.append("\"brand\":").append(escape(c.getBrand())).append(",");
        sb.append("\"model\":").append(escape(c.getModel())).append(",");
        sb.append("\"specs\":").append(escape(c.getSpecs())).append(",");
        sb.append("\"stat_val\":").append(escape(c.getStatVal())).append(",");
        sb.append("\"stat_label\":").append(escape(c.getStatLabel())).append(",");
        sb.append("\"badge\":").append(escape(c.getBadge())).append(",");
        sb.append("\"price\":").append(c.getPrice()).append(",");
        sb.append("\"tdp_watts\":").append(c.getTdpWatts()).append(",");
        sb.append("\"perf_score\":").append(c.getPerfScore());
        sb.append("}");
        return sb.toString();
    }

    public static String toHardwareListJson(List<HardwareComponent> list) {
        if (list == null) return "[]";
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(toJson(list.get(i)));
        }
        sb.append("]");
        return sb.toString();
    }

    public static String toJson(BuildReport r) {
        if (r == null) return "null";
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"total_price\":").append(r.getTotalPrice()).append(",");
        sb.append("\"total_tdp_watts\":").append(r.getTotalTdpWatts()).append(",");
        sb.append("\"recommended_psu_watts\":").append(r.getRecommendedPsuWatts()).append(",");
        sb.append("\"bottleneck_percentage\":").append(r.getBottleneckPercentage()).append(",");
        sb.append("\"bottleneck_component\":").append(escape(r.getBottleneckComponent())).append(",");
        sb.append("\"bottleneck_explanation\":").append(escape(r.getBottleneckExplanation())).append(",");
        sb.append("\"gaming_1080p_score\":").append(r.getGaming1080pScore()).append(",");
        sb.append("\"gaming_1440p_score\":").append(r.getGaming1440pScore()).append(",");
        sb.append("\"gaming_4k_score\":").append(r.getGaming4kScore()).append(",");
        sb.append("\"rendering_score\":").append(r.getRenderingScore()).append(",");
        sb.append("\"productivity_score\":").append(r.getProductivityScore()).append(",");
        sb.append("\"ai_compute_score\":").append(r.getAiComputeScore()).append(",");
        
        // alerts
        sb.append("\"compatibility_alerts\":[");
        for (int i = 0; i < r.getCompatibilityAlerts().size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(escape(r.getCompatibilityAlerts().get(i)));
        }
        sb.append("],");

        // tips
        sb.append("\"optimization_tips\":[");
        for (int i = 0; i < r.getOptimizationTips().size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(escape(r.getOptimizationTips().get(i)));
        }
        sb.append("],");

        // components
        sb.append("\"selected_components\":").append(toHardwareListJson(r.getSelectedComponents()));
        sb.append("}");
        return sb.toString();
    }

    public static String escape(String s) {
        if (s == null) return "\"\"";
        StringBuilder sb = new StringBuilder("\"");
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            switch (ch) {
                case '"': sb.append("\\\""); break;
                case '\\': sb.append("\\\\"); break;
                case '\b': sb.append("\\b"); break;
                case '\f': sb.append("\\f"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                case '\t': sb.append("\\t"); break;
                default:
                    if (ch < ' ') {
                        String t = "000" + Integer.toHexString(ch);
                        sb.append("\\u").append(t.substring(t.length() - 4));
                    } else {
                        sb.append(ch);
                    }
            }
        }
        sb.append("\"");
        return sb.toString();
    }

    /**
     * Simple JSON key-value extractor for request bodies.
     */
    public static Map<String, String> parseSimpleJson(String json) {
        Map<String, String> map = new HashMap<String, String>();
        if (json == null || json.trim().isEmpty()) return map;
        
        json = json.trim();
        if (json.startsWith("{")) json = json.substring(1);
        if (json.endsWith("}")) json = json.substring(0, json.length() - 1);

        String[] pairs = json.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
        for (String pair : pairs) {
            String[] kv = pair.split(":(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", 2);
            if (kv.length == 2) {
                String key = stripQuotes(kv[0].trim());
                String val = stripQuotes(kv[1].trim());
                map.put(key, val);
            }
        }
        return map;
    }

    private static String stripQuotes(String s) {
        if (s.startsWith("\"") && s.endsWith("\"") && s.length() >= 2) {
            return s.substring(1, s.length() - 1);
        }
        return s;
    }
}
