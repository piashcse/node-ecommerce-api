import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Apply ESLint to JavaScript and TypeScript files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        ecmaVersion: "latest", // Use the latest ECMAScript features
        sourceType: "module",  // Support ES Modules
      },
      globals: {
        ...globals.node, // Add Node.js globals
      },
    },
    rules: {
      "no-console": "warn", // Warn on console usage
    },
  },
  // Add default recommended rules for JavaScript
  pluginJs.configs.recommended,
  // Add recommended TypeScript rules
  {
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error"], // Example: stricter unused var checks
    },
  },
];
