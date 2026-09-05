import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

// Flat config. `react/jsx-uses-vars` is what tells no-unused-vars that a
// component referenced only in JSX is used; without it every import of a
// component reads as unused. Parallel-session draft files are ignored.
export default [
  { ignores: ["dist", "scripts/**", "*.config.js", "assets-source/**", "src/**/*-Allam55.jsx"] },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    settings: { react: { version: "detect" } },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/jsx-uses-vars": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
  {
    // Tests run under Node (vitest) and read process.cwd() for fixture paths.
    files: ["src/test/**/*.{js,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
];
