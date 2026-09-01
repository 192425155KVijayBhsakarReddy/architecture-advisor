package com.advisor.handler;

import com.advisor.model.AnalysisRequest;
import com.advisor.model.BuildReport;
import com.advisor.service.PerformanceAnalyzer;
import com.advisor.util.JsonUtil;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Map;

public class AnalyzeApiHandler implements HttpHandler {
    private final PerformanceAnalyzer performanceAnalyzer;

    public AnalyzeApiHandler(PerformanceAnalyzer performanceAnalyzer) {
        this.performanceAnalyzer = performanceAnalyzer;
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

            AnalysisRequest req = new AnalysisRequest();
            if (!body.trim().isEmpty()) {
                Map<String, String> map = JsonUtil.parseSimpleJson(body);
                req.setCpuModel(map.get("cpu"));
                req.setGpuModel(map.get("gpu"));
                req.setRamModel(map.get("ram"));
                req.setMbModel(map.get("mb"));
                req.setStorageModel(map.get("storage"));
                req.setPsuModel(map.get("psu"));
                req.setCoolerModel(map.get("cooler"));
                req.setTargetWorkload(map.get("workload"));
            }

            BuildReport report = performanceAnalyzer.analyze(req);
            String json = JsonUtil.toJson(report);

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
