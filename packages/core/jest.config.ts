import type { JestConfigWithTsJest } from "ts-jest";

export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.test.json",
      },
    ],
  },
} satisfies JestConfigWithTsJest;
