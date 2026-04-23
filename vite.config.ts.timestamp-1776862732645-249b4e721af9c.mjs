// vite.config.ts
import { defineConfig } from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/lovable-tagger/dist/index.js";
import obfuscator from "file:///C:/Users/willi/Downloads/original-privacy/node_modules/vite-plugin-javascript-obfuscator/dist/index.cjs.js";
var __vite_injected_original_dirname = "C:\\Users\\willi\\Downloads\\original-privacy";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: true,
    // LIBERA O ACESSO PARA O SIMULADOR
    port: 8080,
    hmr: {
      overlay: false
    },
    headers: {
      // LIBERA O SITE PARA APARECER DENTRO DA EXTENSÃO NO LOCALHOST
      "Content-Security-Policy": "frame-ancestors 'self' *"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx3aWxsaVxcXFxEb3dubG9hZHNcXFxcb3JpZ2luYWwtcHJpdmFjeVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcd2lsbGlcXFxcRG93bmxvYWRzXFxcXG9yaWdpbmFsLXByaXZhY3lcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3dpbGxpL0Rvd25sb2Fkcy9vcmlnaW5hbC1wcml2YWN5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5pbXBvcnQgb2JmdXNjYXRvciBmcm9tIFwidml0ZS1wbHVnaW4tamF2YXNjcmlwdC1vYmZ1c2NhdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsIC8vIExJQkVSQSBPIEFDRVNTTyBQQVJBIE8gU0lNVUxBRE9SXG4gICAgcG9ydDogODA4MCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgLy8gTElCRVJBIE8gU0lURSBQQVJBIEFQQVJFQ0VSIERFTlRSTyBEQSBFWFRFTlNcdTAwQzNPIE5PIExPQ0FMSE9TVFxuICAgICAgXCJDb250ZW50LVNlY3VyaXR5LVBvbGljeVwiOiBcImZyYW1lLWFuY2VzdG9ycyAnc2VsZicgKlwiLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBtb2RlID09PSBcInByb2R1Y3Rpb25cIiAmJiBvYmZ1c2NhdG9yKHtcbiAgICAgIGNvbXBhY3Q6IHRydWUsXG4gICAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IGZhbHNlLFxuICAgICAgZGVhZENvZGVJbmplY3Rpb246IGZhbHNlLFxuICAgICAgZGVidWdQcm90ZWN0aW9uOiBmYWxzZSxcbiAgICAgIGRlYnVnUHJvdGVjdGlvbkludGVydmFsOiAwLFxuICAgICAgZGlzYWJsZUNvbnNvbGVPdXRwdXQ6IGZhbHNlLFxuICAgICAgaWRlbnRpZmllck5hbWVzR2VuZXJhdG9yOiBcImhleGFkZWNpbWFsXCIsXG4gICAgICBsb2c6IGZhbHNlLFxuICAgICAgbnVtYmVyc1RvRXhwcmVzc2lvbnM6IGZhbHNlLFxuICAgICAgcmVuYW1lR2xvYmFsczogZmFsc2UsXG4gICAgICBzZWxmRGVmZW5kaW5nOiBmYWxzZSxcbiAgICAgIHNpbXBsaWZ5OiB0cnVlLFxuICAgICAgc3BsaXRTdHJpbmdzOiBmYWxzZSxcbiAgICAgIHN0cmluZ0FycmF5OiB0cnVlLFxuICAgICAgc3RyaW5nQXJyYXlDYWxsc1RyYW5zZm9ybTogZmFsc2UsXG4gICAgICBzdHJpbmdBcnJheUNhbGxzVHJhbnNmb3JtVGhyZXNob2xkOiAwLjUsXG4gICAgICBzdHJpbmdBcnJheUVuY29kaW5nOiBbXCJiYXNlNjRcIl0sXG4gICAgICBzdHJpbmdBcnJheUluZGV4U2hpZnQ6IHRydWUsXG4gICAgICBzdHJpbmdBcnJheVJvdGF0ZTogdHJ1ZSxcbiAgICAgIHN0cmluZ0FycmF5U2h1ZmZsZTogdHJ1ZSxcbiAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDb3VudDogMSxcbiAgICAgIHN0cmluZ0FycmF5V3JhcHBlcnNDaGFpbmVkQ2FsbHM6IHRydWUsXG4gICAgICBzdHJpbmdBcnJheVdyYXBwZXJzUGFyYW1ldGVyc01heENvdW50OiAyLFxuICAgICAgc3RyaW5nQXJyYXlXcmFwcGVyc1R5cGU6IFwidmFyaWFibGVcIixcbiAgICAgIHN0cmluZ0FycmF5VGhyZXNob2xkOiAwLjc1LFxuICAgICAgdW5pY29kZUVzY2FwZVNlcXVlbmNlOiBmYWxzZSxcbiAgICB9KSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICAgIGRlZHVwZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC9qc3gtcnVudGltZVwiLCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiLCBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiLCBcIkB0YW5zdGFjay9xdWVyeS1jb3JlXCJdLFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VCxTQUFTLG9CQUFvQjtBQUNwVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sZ0JBQWdCO0FBSnZCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsU0FBUztBQUFBO0FBQUEsTUFFUCwyQkFBMkI7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFNBQVMsaUJBQWlCLGdCQUFnQjtBQUFBLElBQzFDLFNBQVMsZ0JBQWdCLFdBQVc7QUFBQSxNQUNsQyxTQUFTO0FBQUEsTUFDVCx1QkFBdUI7QUFBQSxNQUN2QixtQkFBbUI7QUFBQSxNQUNuQixpQkFBaUI7QUFBQSxNQUNqQix5QkFBeUI7QUFBQSxNQUN6QixzQkFBc0I7QUFBQSxNQUN0QiwwQkFBMEI7QUFBQSxNQUMxQixLQUFLO0FBQUEsTUFDTCxzQkFBc0I7QUFBQSxNQUN0QixlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixVQUFVO0FBQUEsTUFDVixjQUFjO0FBQUEsTUFDZCxhQUFhO0FBQUEsTUFDYiwyQkFBMkI7QUFBQSxNQUMzQixvQ0FBb0M7QUFBQSxNQUNwQyxxQkFBcUIsQ0FBQyxRQUFRO0FBQUEsTUFDOUIsdUJBQXVCO0FBQUEsTUFDdkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsMEJBQTBCO0FBQUEsTUFDMUIsaUNBQWlDO0FBQUEsTUFDakMsdUNBQXVDO0FBQUEsTUFDdkMseUJBQXlCO0FBQUEsTUFDekIsc0JBQXNCO0FBQUEsTUFDdEIsdUJBQXVCO0FBQUEsSUFDekIsQ0FBQztBQUFBLEVBQ0gsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxhQUFhLHFCQUFxQix5QkFBeUIseUJBQXlCLHNCQUFzQjtBQUFBLEVBQzlIO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
