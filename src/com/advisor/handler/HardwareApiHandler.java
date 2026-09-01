package com.advisor.handler;

import com.advisor.model.HardwareComponent;
import com.advisor.service.HardwareService;
import com.advisor.util.JsonUtil;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class HardwareApiHandler implements HttpHandler {
    private final HardwareService hardwareService;

    public HardwareApiHandler(HardwareService hardwareService) {
        this.hardwareService = hardwareService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        // Enable CORS
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        try {
            URI uri = exchange.getRequestURI();
            Map<String, String> queryParams = parseQueryParams(uri.getRawQuery());

            String type = queryParams.get("type");
            String tier = queryParams.get("tier");
            String env = queryParams.get("env");
            String query = queryParams.get("q");

            List<HardwareComponent> results = hardwareService.filter(type, tier, env, query);
            String jsonResponse = JsonUtil.toHardwareListJson(results);

            byte[] responseBytes = jsonResponse.getBytes(StandardCharsets.UTF_8);
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

    private Map<String, String> parseQueryParams(String query) {
        Map<String, String> map = new HashMap<String, String>();
        if (query == null || query.isEmpty()) return map;
        String[] pairs = query.split("&");
        for (String pair : pairs) {
            String[] kv = pair.split("=", 2);
            try {
                String k = URLDecoder.decode(kv[0], "UTF-8");
                String v = kv.length > 1 ? URLDecoder.decode(kv[1], "UTF-8") : "";
                map.put(k, v);
            } catch (Exception ignored) {}
        }
        return map;
    }
}
