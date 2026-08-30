import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Directs any frontend request starting with /api to the C# backend
      "/api": {
        target: "https://localhost:63335", // Use your exact Visual Studio URL here
        changeOrigin: true,
        secure: false, // Prevents SSL certificate errors on localhost
      },
    },
  },
  dev: {
    sourcemap: true, // Tells development server to track code lines
  },
  build: {
    sourcemap: true, // This enables breakpoint mapping in VS Code
  },
});
