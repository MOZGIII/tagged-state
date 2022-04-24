module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "sort-imports": "off",
    "import/order": "error",
  },

  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: ".",
        project: ["./tsconfig.json"],

        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
    },
  ],
};
