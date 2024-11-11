import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    minify: true,
    sourcemap: false,
  },
  plugins: [react()],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import postcssImport from "postcss-import"; // Import postcss-import as an ES module

// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     outDir: "build",
//     minify: true,
//     sourcemap: false,
//   },
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [
//         postcssImport, // Use the imported postcss-import plugin
//       ],
//     },
//   },
// });
