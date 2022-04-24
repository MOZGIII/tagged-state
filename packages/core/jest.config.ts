import type { InitialOptionsTsJest } from "ts-jest/dist/types";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: { "ts-jest": { tsconfig: "./tsconfig.test.json" } },
} as InitialOptionsTsJest;
