package com.advisor;

import com.advisor.handler.*;
import com.advisor.service.HardwareService;
import com.advisor.service.PerformanceAnalyzer;
import com.advisor.service.RecommendationEngine;
import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

public class Main {
    private static final int DEFAULT_PORT = 8080;

    public static void main(String[] args) {
        int port = DEFAULT_PORT;
        if (args.length > 0) {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException ignored) {}
        }

        try {
            // Initialize Core Services
            HardwareService hardwareService = new HardwareService();
            RecommendationEngine recommendationEngine = new RecommendationEngine(hardwareService);
            PerformanceAnalyzer performanceAnalyzer = new PerformanceAnalyzer(hardwareService);

            // Locate web root
            File baseDir = new File(System.getProperty("user.dir"));

            // Create HTTP Server
            HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

            // REST API Endpoints
            server.createContext("/api/hardware", new HardwareApiHandler(hardwareService));
            server.createContext("/api/recommend", new RecommendApiHandler(recommendationEngine));
            server.createContext("/api/analyze", new AnalyzeApiHandler(performanceAnalyzer));
            server.createContext("/api/stats", new StatsApiHandler(hardwareService));

            // Static Web Assets Server
            server.createContext("/", new StaticFileHandler(baseDir));

            server.setExecutor(Executors.newFixedThreadPool(8));
            server.start();

            System.out.println("===============================================================");
            System.out.println("   ⚡ JAVA HARDWARE & PERFORMANCE ADVISOR SERVER STARTED ⚡    ");
            System.out.println("===============================================================");
            System.out.println("   -> Local URL    : http://localhost:" + port);
            System.out.println("   -> REST APIs    : http://localhost:" + port + "/api/stats");
            System.out.println("   -> Catalog Items: " + hardwareService.getAll().size() + " components loaded");
            System.out.println("   -> Press Ctrl+C to stop server");
            System.out.println("===============================================================");

        } catch (Exception e) {
            System.err.println("Fatal Error starting server: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
