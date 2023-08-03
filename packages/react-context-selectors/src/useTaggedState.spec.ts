/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { AssertEqual } from "@tagged-state/testutils";
import {
  StateProps,
  StateVariant,
  UnexpectedStateError,
} from "@tagged-state/core";
import useTaggedState from "./useTaggedState";

describe("useTaggedState", () => {
  it("extracts the context value when it's at the expected state", () => {
    type AProps = { hello: string };
    type BProps = { b: boolean };

    type State = StateVariant<"a", AProps> | StateVariant<"b", BProps>;

    const data = { hello: "world" };

    const view = renderHook(() => {
      const Test = React.createContext<State>({ tag: "a", data });
      return useTaggedState(Test, "a" as const);
    });

    const actualValue = view.result.current;

    type ActualType = typeof actualValue;
    type ExpectedType = StateProps<State>["a"];

    const assert1: AssertEqual<ActualType, ExpectedType> = true;

    expect(actualValue).toBe(data);
  });

  it("throws when the state is at an invalid state", () => {
    type AProps = { a: string };
    type BProps = { b: boolean };

    type State = StateVariant<"a", AProps> | StateVariant<"b", BProps>;

    const data = { b: true };

    const view = renderHook(() => {
      const Test = React.createContext<State>({ tag: "b", data });
      return useTaggedState(Test, "a" as const);
    });

    type ActualWouldBeType = typeof view.result.current;
    type ExpectedType = StateProps<State>["a"];

    const assert1: AssertEqual<ActualWouldBeType, ExpectedType> = true;

    expect(() => {
      return view.result.current;
    }).toThrowError(new UnexpectedStateError("a", "b"));
  });
});
