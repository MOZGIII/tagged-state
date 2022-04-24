import type { InitialOptionsTsJest } from "ts-jest/dist/types";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
} as InitialOptionsTsJest;
