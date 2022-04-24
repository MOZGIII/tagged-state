import UnexpectedStateError from "./UnexpectedStateError";

describe("UnexpectedStateError", () => {
  it("has correct prototype", () => {
    expect(new UnexpectedStateError("a", "b")).toBeInstanceOf(
      UnexpectedStateError
    );
  });

  it("works when we throw it and match with jest", () => {
    expect(() => {
      throw new UnexpectedStateError("a", "b");
    }).toThrowError(UnexpectedStateError);
  });

  it("assigns properties", () => {
    expect(new UnexpectedStateError("a", "b")).toMatchObject({
      expectedTag: "a",
      actualTag: "b",
    });
  });

  it("has proper message", () => {
    expect(new UnexpectedStateError("a", "b")).toMatchObject({
      message: `The state is expected to be "a", but it was "b".`,
    });
  });
});
