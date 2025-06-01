import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0.3000",
  },
});
