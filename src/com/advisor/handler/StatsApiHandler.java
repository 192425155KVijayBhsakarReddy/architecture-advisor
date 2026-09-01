package com.advisor.handler;

import com.advisor.service.HardwareService;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class StatsApiHandler implements HttpHandler {
    private final HardwareService hardwareService;

    public StatsApiHandler(HardwareService hardwareService) {
        this.hardwareService = hardwareService;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, OPTIONS");

        if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        int totalCount = hardwareService.getAll().size();
        String json = "{" +
                "\"status\":\"ONLINE\"," +
                "\"engine\":\"Java 8+ Architecture & Hardware Advisor Engine\"," +
                "\"version\":\"2.0.0\"," +
                "\"total_hardware_components\":" + totalCount + "," +
                "\"categories\":[\"CPU\",\"GPU\",\"RAM\",\"Motherboard\",\"Storage\",\"PSU\",\"Cooler\"]," +
                "\"environments\":[\"basic\",\"entry_office\",\"media\",\"home\",\"office\",\"studio\",\"esports\",\"edge\",\"cloud\",\"research\",\"datacenter\"]" +
                "}";

        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(200, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
