// vite.config.ts
import { defineConfig } from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/lovable-tagger/dist/index.js";
import obfuscator from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/vite-plugin-javascript-obfuscator/dist/index.cjs.js";
var __vite_injected_original_dirname = "C:\\Users\\willi\\Downloads\\original-privacy";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && obfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: false,
      identifierNamesGenerator: "hexadecimal",
      log: false,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayCallsTransformThreshold: 0.5,
      stringArrayEncoding: ["base64"],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: "variable",
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
    })
  ].filter(Boolean),
  build: {
    sourcemap: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb3dubG9hZHNcXFxcb3JpZ2luYWwtcHJpdmFjeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcd2lsbGlcXFxcRG93bmxvYWRzXFxcXG9yaWdpbmFsLXByaXZhY3lcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3dpbGxpL0Rvd25sb2Fkcy9vcmlnaW5hbC1wcml2YWN5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5pbXBvcnQgb2JmdXNjYXRvciBmcm9tIFwidml0ZS1wbHVnaW4tamF2YXNjcmlwdC1vYmZ1c2NhdG9yXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBtb2RlID09PSBcInByb2R1Y3Rpb25cIiAmJiBvYmZ1c2NhdG9yKHtcbiAgICAgIGNvbXBhY3Q6IHRydWUsXG4gICAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IGZhbHNlLFxuICAgICAgZGVhZENvZGVJbmplY3Rpb246IGZhbHNlLFxuICAgICAgZGVidWdQcm90ZWN0aW9uOiBmYWxzZSxcbiAgICAgIGRlYnVnUHJvdGVjdGlvbkludGVydmFsOiAwLFxuICAgICAgZGlzYWJsZUNvbnNvbGVPdXRwdXQ6IGZhbHNlLFxuICAgICAgaWRlbnRpZmllck5hbWVzR2VuZXJhdG9yOiBcImhleGFkZWNpbWFsXCIsXG4gICAgICBsb2c6IGZhbHNlLFxuICAgICAgbnVtYmVyc1RvRXhwcmVzc2lvbnM6IGZhbHNlLFxuICAgICAgcmVuYW1lR2xvYmFsczogZmFsc2UsXG4gICAgICBzZWxmRGVmZW5kaW5nOiBmYWxzZSxcbiAgICAgIHNpbXBsaWZ5OiB0cnVlLFxuICAgICAgc3BsaXRTdHJpbmdzOiBmYWxzZSxcbiAgICAgIHN0cmluZ0FycmF5OiB0cnVlLFxuICAgICAgc3RyaW5nQXJyYXlDYWxsc1RyYW5zZm9ybTogZmFsc2UsXG4gICAgICBzdHJpbmdBcnJheUNhbGxzVHJhbnNmb3JtVGhyZXNob2xkOiAwLjUsXG4gICAgICBzdHJpbmdBcnJheUVuY29kaW5nOiBbXCJiYXNlNjRcIl0sXG4gICAgICBzdHJpbmdBcnJheUluZGV4U2hpZnQ6IHRydWUsXG4gICAgICBzdHJpbmdBcnJheVJvdGF0ZTogdHJ1ZSxcbiAgICAgIHN0cmluZ0FycmF5U2h1ZmZsZTogdHJ1ZSxcbiAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDb3VudDogMSxcbiAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDaGFpbmVkQ2FsbHM6IHRydWUsXG4gICAgICBzdHJpbmdBcnJheVdyYXBwZXJzUGFyYW1ldGVyc01heENvdW50OiAyLFxuICAgICAgc3RyaW5nQXJyYXlXcmFwcGVyc1R5cGU6IFwidmFyaWFibGVcIixcbiAgICAgIHN0cmluZ0FycmF5VGhyZXNob2xkOiAwLjc1LFxuICAgICAgdW5pY29kZUVzY2FwZVNlcXVlbmNlOiBmYWxzZSxcbiAgICB9KSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICAgIGRlZHVwZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC9qc3gtcnVudGltZVwiLCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiLCBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiLCBcIkB0YW5zdGFjay9xdWVyeS1jb3JlXCJdLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VCxTQUFTLG9CQUFvQjtBQUNwVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sZ0JBQWdCO0FBSnZCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxTQUFTLGdCQUFnQixXQUFXO0FBQUEsTUFDbEMsU0FBUztBQUFBLE1BQ1QsdUJBQXVCO0FBQUEsTUFDdkIsbUJBQW1CO0FBQUEsTUFDbkIsaUJBQWlCO0FBQUEsTUFDakIseUJBQXlCO0FBQUEsTUFDekIsc0JBQXNCO0FBQUEsTUFDdEIsMEJBQTBCO0FBQUEsTUFDMUIsS0FBSztBQUFBLE1BQ0wsc0JBQXNCO0FBQUEsTUFDdEIsZUFBZTtBQUFBLE1BQ2YsZUFBZTtBQUFBLE1BQ2YsVUFBVTtBQUFBLE1BQ1YsY0FBYztBQUFBLE1BQ2QsYUFBYTtBQUFBLE1BQ2IsMkJBQTJCO0FBQUEsTUFDM0Isb0NBQW9DO0FBQUEsTUFDcEMscUJBQXFCLENBQUMsUUFBUTtBQUFBLE1BQzlCLHVCQUF1QjtBQUFBLE1BQ3ZCLG1CQUFtQjtBQUFBLE1BQ25CLG9CQUFvQjtBQUFBLE1BQ3BCLDBCQUEwQjtBQUFBLE1BQzFCLGlDQUFpQztBQUFBLE1BQ2pDLHVDQUF1QztBQUFBLE1BQ3ZDLHlCQUF5QjtBQUFBLE1BQ3pCLHNCQUFzQjtBQUFBLE1BQ3RCLHVCQUF1QjtBQUFBLElBQ3pCLENBQUM7QUFBQSxFQUNILEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLElBQ0EsUUFBUSxDQUFDLFNBQVMsYUFBYSxxQkFBcUIseUJBQXlCLHlCQUF5QixzQkFBc0I7QUFBQSxFQUM5SDtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
