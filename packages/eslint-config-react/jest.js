module.exports = {
  extends: ["@tagged-state/eslint-config/jest"],
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/*.{spec,test}.*"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
