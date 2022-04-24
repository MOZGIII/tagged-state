/* eslint-disable @typescript-eslint/no-unused-vars */
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
    // @ts-expect-error
    const assert1: State = mkts("uninit", { someVal: "qwe" }); // mismatched subtypes
    // @ts-expect-error
    const assert2: State = mkts("ready", {}); // mismatched subtypes
    // @ts-expect-error
    const assert3: State = mkts("ready", { qwe: true }); // invalid data
    // @ts-expect-error
    const assert4: State = mkts("ready", 123); // invalid data
    // @ts-expect-error
    const assert5: State = mkts("unknown", {}); // invalid tag
  });
});
