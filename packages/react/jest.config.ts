import type { JestConfigWithTsJest } from "ts-jest/dist/types";

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
} as JestConfigWithTsJest;
