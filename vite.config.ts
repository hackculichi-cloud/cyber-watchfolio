import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync } from "node:fs";

// Exercise the deployed security policy in local production-browser checks too.
const deployment = JSON.parse(readFileSync(new URL("./vercel.json", import.meta.url), "utf8")) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
};
const securityHeaders = Object.fromEntries(deployment.headers[0].headers.map(({ key, value }) => [key, value]));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  preview: { headers: securityHeaders },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
