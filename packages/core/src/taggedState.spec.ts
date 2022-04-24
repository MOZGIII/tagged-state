/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/expect-expect */
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

    // @ts-expect-error: no tag or data
    const assert1: State = {};

    // @ts-expect-error: no data
    const assert2: State = { tag: "uninit" };

    // @ts-expect-error: invalid data
    const assert3: State = { tag: "uninit", data: undefined };

    // @ts-expect-error: invalid data
    const assert4: State = { tag: "uninit", data: 123 };

    // @ts-expect-error: invalid data
    const assert5: State = { tag: "uninit", data: { qwe: true } };

    // @ts-expect-error: unmatched data subtype
    const assert6: State = { tag: "uninit", data: { someVal: "qwe" } };

    // @ts-expect-error: unmatched data subtype
    const assert7: State = { tag: "error", data: { someVal: "qwe" } };

    // @ts-expect-error: invalid data
    const assert8: State = { tag: "error", data: { qwe: true } };

    // @ts-expect-error: unknown tag
    const assert9: State = { tag: "unknown", data: {} };
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
      uninit: Record<string, never>;
      loading: Record<string, never>;
      ready: ReadyProps;
      error: ErrorProps;
    };

    const assert1: AssertEqual<StateProps<State>, ExpectedProps> = true;
  });
});
