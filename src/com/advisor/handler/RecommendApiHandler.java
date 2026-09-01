package com.advisor.handler;

import com.advisor.model.HardwareComponent;
import com.advisor.model.RecommendationRequest;
import com.advisor.service.RecommendationEngine;
import com.advisor.util.JsonUtil;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

public class RecommendApiHandler implements HttpHandler {
    private final RecommendationEngine recommendationEngine;

    public RecommendApiHandler(RecommendationEngine recommendationEngine) {
        this.recommendationEngine = recommendationEngine;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        try {
            InputStream is = exchange.getRequestBody();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            byte[] buf = new byte[1024];
            int read;
            while ((read = is.read(buf)) != -1) {
                baos.write(buf, 0, read);
            }
            String body = new String(baos.toByteArray(), StandardCharsets.UTF_8);

            RecommendationRequest req = new RecommendationRequest();
            if (!body.trim().isEmpty()) {
                Map<String, String> map = JsonUtil.parseSimpleJson(body);
                if (map.containsKey("environment")) req.setEnvironment(map.get("environment"));
                if (map.containsKey("tier")) req.setTier(map.get("tier"));
                if (map.containsKey("preference")) req.setPreference(map.get("preference"));
                if (map.containsKey("form_factor")) req.setFormFactor(map.get("form_factor"));
                if (map.containsKey("max_budget")) {
                    try {
                        req.setMaxBudget(Double.parseDouble(map.get("max_budget")));
                    } catch (Exception ignored) {}
                }
            }

            List<HardwareComponent> recommendation = recommendationEngine.recommend(req);
            String json = JsonUtil.toHardwareListJson(recommendation);

            byte[] responseBytes = json.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            exchange.sendResponseHeaders(200, responseBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(responseBytes);
            os.close();
        } catch (Exception e) {
            String err = "{\"error\":" + JsonUtil.escape(e.getMessage()) + "}";
            byte[] bytes = err.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
            exchange.sendResponseHeaders(500, bytes.length);
            exchange.getResponseBody().write(bytes);
            exchange.getResponseBody().close();
        }
    }
}
