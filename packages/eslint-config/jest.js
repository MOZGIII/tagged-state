module.exports = {
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/*.{spec,test}.*"],
      extends: ["plugin:jest/recommended"],
      env: {
        "jest/globals": true,
      },
      parserOptions: {
        project: ["./tsconfig.test.json"],
      },
    },
  ],
};
