import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"

const c = [
  {
    ignores: [
      "node_modules/*",
      "dist/*"
    ]
  },
  {
    languageOptions: {
      globals: globals.node
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: "project/rules",
    rules: {
      "eol-last": ["error", "always"],
      "semi": ["error", "never"],
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-namespace": "off"
    }
  }
]

console.log(c)