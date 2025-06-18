import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginQuery from '@tanstack/eslint-plugin-query'


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    }
  },
]);
