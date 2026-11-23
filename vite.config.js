import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// User site: https://hasibur013.github.io/ (repo hasibur013.github.io)
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});
