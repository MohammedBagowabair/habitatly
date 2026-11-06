import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE || "/",
    plugins: [react(), tailwindcss()],
    server: {
      host: "0.0.0.0",
      port: 43123,
    },
    preview: {
      host: "0.0.0.0",
      port: 43123,
    },
  };
});
