import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const pagesBase = process.env.GITHUB_PAGES === "true" ? "/hasib_ML_portfolio/" : "/";

export default defineConfig({
  base: pagesBase,
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
