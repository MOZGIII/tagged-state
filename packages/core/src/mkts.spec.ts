/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/expect-expect */
import { StateVariant } from "./taggedState";
import mkts from "./mkts";

describe("mkts", () => {
  type ReadyProps = { someVal: string };

  type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

  it("typechecks when valid", () => {
    const assert1: State = mkts("uninit", {});
    const assert2: State = mkts("ready", { someVal: "qwe" });
    const assert3: State = mkts("uninit" as const, {});
    const assert4: State = mkts("ready" as const, {
      someVal: "qwe",
    });
  });

  it("fails typecheck when invalid", () => {
    // @ts-expect-error: mismatched subtypes
    const assert1: State = mkts("uninit", { someVal: "qwe" });

    // @ts-expect-error:  mismatched subtypes
    const assert2: State = mkts("ready", {});

    // @ts-expect-error: invalid data
    const assert3: State = mkts("ready", { qwe: true });

    // @ts-expect-error: invalid data
    const assert4: State = mkts("ready", 123);

    // @ts-expect-error: invalid tag
    const assert5: State = mkts("unknown", {});
  });
});
