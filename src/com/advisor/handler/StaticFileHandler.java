package com.advisor.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

public class StaticFileHandler implements HttpHandler {
    private final File baseDir;

    public StaticFileHandler(File baseDir) {
        this.baseDir = baseDir;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        URI uri = exchange.getRequestURI();
        String path = uri.getPath();
        if (path == null || path.equals("/") || path.isEmpty()) {
            path = "/index.html";
        }

        File target = new File(baseDir, path.replace('/', File.separatorChar));
        // Security check: ensure path is inside baseDir
        if (!target.getCanonicalPath().startsWith(baseDir.getCanonicalPath()) || !target.exists() || target.isDirectory()) {
            String notFound = "404 Not Found";
            exchange.sendResponseHeaders(404, notFound.length());
            OutputStream os = exchange.getResponseBody();
            os.write(notFound.getBytes());
            os.close();
            return;
        }

        String mime = getMimeType(target.getName());
        exchange.getResponseHeaders().set("Content-Type", mime);
        exchange.sendResponseHeaders(200, target.length());

        OutputStream os = exchange.getResponseBody();
        FileInputStream fis = new FileInputStream(target);
        byte[] buffer = new byte[4096];
        int count;
        while ((count = fis.read(buffer)) >= 0) {
            os.write(buffer, 0, count);
        }
        fis.close();
        os.close();
    }

    private String getMimeType(String filename) {
        if (filename.endsWith(".html") || filename.endsWith(".htm")) return "text/html; charset=UTF-8";
        if (filename.endsWith(".css")) return "text/css; charset=UTF-8";
        if (filename.endsWith(".js")) return "application/javascript; charset=UTF-8";
        if (filename.endsWith(".json")) return "application/json; charset=UTF-8";
        if (filename.endsWith(".png")) return "image/png";
        if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) return "image/jpeg";
        if (filename.endsWith(".svg")) return "image/svg+xml";
        if (filename.endsWith(".mp4")) return "video/mp4";
        return "application/octet-stream";
    }
}
