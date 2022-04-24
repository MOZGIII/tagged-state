import helloWorld from ".";

describe("hello world", () => {
  it("has proper text", () => {
    expect(helloWorld).toBe("hello world");
  });
});
