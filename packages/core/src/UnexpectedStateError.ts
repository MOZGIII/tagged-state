import { AnyTaggedState } from "./taggedState";

class UnexpectedStateError<
  State extends AnyTaggedState,
  ExpectedTag extends State["tag"]
> extends Error {
  constructor(
    public readonly expectedTag: ExpectedTag,
    public readonly actualTag: State["tag"]
  ) {
    super(
      `The state is expected to be ${JSON.stringify(expectedTag)}, ` +
        `but it was ${JSON.stringify(actualTag)}.`
    );
    this.name = "UnexpectedStateError";
    Object.setPrototypeOf(this, UnexpectedStateError.prototype);
  }
}

export default UnexpectedStateError;
