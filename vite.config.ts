import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import obfuscator from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ mode }) => ({
  server: {
    host: true, // LIBERA O ACESSO PARA O SIMULADOR
    port: 8080,
    hmr: {
      overlay: false,
    },
    headers: {
      // LIBERA O SITE PARA APARECER DENTRO DA EXTENSÃO NO LOCALHOST
      "Content-Security-Policy": "frame-ancestors 'self' *",
    },
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
      unicodeEscapeSequence: false,
    }),
  ].filter(Boolean),
  build: {
    sourcemap: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
