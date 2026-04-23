import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "dist/**",
    "public/**",
  ]),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
  },
  js.configs.recommended,
  next.configs.recommended,
  ...nextCoreWebVitals,
  ...tseslint.configs.recommended,
]);
