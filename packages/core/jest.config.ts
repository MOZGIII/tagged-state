import type { JestConfigWithTsJest } from "ts-jest/dist/types";

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "./tsconfig.test.json" }],
  },
} as JestConfigWithTsJest;
