/* eslint-disable @typescript-eslint/no-unused-vars */
import { AssertEqual } from "@tagged-state/testutils";
import { StateProps, StateVariant } from "./taggedState";

describe("tagged state", () => {
  it("allows valid types", () => {
    type ReadyProps = { someVal: string };
    type ErrorProps = { error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | StateVariant<"ready", ReadyProps>
      | StateVariant<"error", ErrorProps>;

    const assert1: State = { tag: "uninit", data: {} };
    const assert2: State = { tag: "loading", data: {} };
    const assert3: State = { tag: "ready", data: { someVal: "qwe" } };
    const assert4: State = { tag: "error", data: { error: new Error() } };
  });

  it("disallows invalid types", () => {
    type ReadyProps = { someVal: string };
    type ErrorProps = { error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | StateVariant<"ready", ReadyProps>
      | StateVariant<"error", ErrorProps>;

    // @ts-expect-error
    const assert1: State = {}; // no tag or data
    // @ts-expect-error
    const assert2: State = { tag: "uninit" }; // no data
    // @ts-expect-error
    const assert3: State = { tag: "uninit", data: undefined }; // invalid data
    // @ts-expect-error
    const assert4: State = { tag: "uninit", data: 123 }; // invalid data
    // @ts-expect-error
    const assert5: State = { tag: "uninit", data: { qwe: true } }; // invalid data
    // @ts-expect-error
    const assert6: State = { tag: "uninit", data: { someVal: "qwe" } }; // unmatched data subtype
    // @ts-expect-error
    const assert7: State = { tag: "error", data: { someVal: "qwe" } }; // unmatched data subtype
    // @ts-expect-error
    const assert8: State = { tag: "error", data: { qwe: true } }; // invalid data
    // @ts-expect-error
    const assert9: State = { tag: "unknown", data: {} }; // unknown tag
  });

  it("correctly derives StateProps", () => {
    type ReadyProps = { someVal: string };
    type ErrorProps = { error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | StateVariant<"ready", ReadyProps>
      | StateVariant<"error", ErrorProps>;

    type ExpectedProps = {
      uninit: {};
      loading: {};
      ready: ReadyProps;
      error: ErrorProps;
    };

    const assert1: AssertEqual<StateProps<State>, ExpectedProps> = true;
  });
});
