/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/expect-expect */
import { AssertEqual } from "@tagged-state/testutils";
import { DelegatedFlatStateVariant } from "./delegatedTaggedState";
import { StateProps, StateVariant } from "./taggedState";

describe("DelegatedFlatStateVariant", () => {
  it("allows valid values", () => {
    type FlatVariant =
      | { tag: "ready"; someVal: string }
      | { tag: "error"; error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | DelegatedFlatStateVariant<"ready", FlatVariant>
      | DelegatedFlatStateVariant<"error", FlatVariant>;

    const assert1: State = { tag: "uninit", data: {} };
    const assert2: State = { tag: "loading", data: {} };
    const assert3: State = { tag: "ready", data: { someVal: "value" } };
    const assert4: State = { tag: "error", data: { error: new Error() } };
  });

  it("disallows invalid values", () => {
    type FlatVariant =
      | { tag: "ready"; someVal: string }
      | { tag: "error"; error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | DelegatedFlatStateVariant<"ready", FlatVariant>
      | DelegatedFlatStateVariant<"error", FlatVariant>;

    // @ts-expect-error: missing data & extra fields
    const assert1: State = { tag: "error", error: new Error() };
    // @ts-expect-error: missing data & extra fields
    const assert2: State = { tag: "error", someVal: true };
    // @ts-expect-error: unmatched data subtype
    const assert3: State = { tag: "error", data: { someVal: true } };
    // @ts-expect-error: unknown tag
    const assert4: State = { tag: "unknown", data: {} };
  });

});
