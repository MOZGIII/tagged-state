import type { InitialOptionsTsJest } from "ts-jest/dist/types";

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: { "ts-jest": { tsconfig: "./tsconfig.test.json" } },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
} as InitialOptionsTsJest;
