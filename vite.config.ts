import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { UserConfigExport } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
}) satisfies UserConfigExport;
