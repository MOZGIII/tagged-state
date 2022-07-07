/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/expect-expect */
import React from "react";
import { render } from "@testing-library/react";
import { AssertEqual } from "@tagged-state/testutils";
import { EmptyObject, StateVariant } from "@tagged-state/core";
import Guard, { StateComponentGuardProps } from "./Guard";
import { StateGuardProps } from "./createContextGuard";

describe("StateGuardProps", () => {
  it("derives properly", () => {
    type ReadyProps = { someVal: string };
    type ErrorProps = { error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | StateVariant<"ready", ReadyProps>
      | StateVariant<"error", ErrorProps>;

    type Expected = {
      uninit: React.ReactElement;
      loading: React.ReactElement;
      ready: React.ReactElement;
      error: React.ReactElement;
    };

    const assert1: AssertEqual<StateGuardProps<State>, Expected> = true;
  });
});

describe("StateGuardComponentProps", () => {
  it("derives properly", () => {
    type ReadyProps = { someVal: string };
    type ErrorProps = { error: Error };

    type State =
      | StateVariant<"uninit">
      | StateVariant<"loading">
      | StateVariant<"ready", ReadyProps>
      | StateVariant<"error", ErrorProps>;

    type Expected = {
      uninit: React.ComponentType<EmptyObject>;
      loading: React.ComponentType<EmptyObject>;
      ready: React.ComponentType<ReadyProps>;
      error: React.ComponentType<ErrorProps>;
    };

    const assert1: AssertEqual<
      StateComponentGuardProps<State>,
      Expected
    > = true;
  });
});

describe("Guard", () => {
  it("renders properly", () => {
    type ReadyProps = { someVal: string };

    type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

    const uninit = () => <>uninit variant</>;
    const ready = jest.fn();

    const view = render(
      <Guard<State>
        taggedState={{ tag: "uninit", data: {} }}
        uninit={uninit}
        ready={ready}
      />
    );

    expect(view.baseElement).toHaveTextContent("uninit variant");
    expect(ready).not.toBeCalled();
  });
});
