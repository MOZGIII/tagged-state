/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jest/expect-expect */
import React from "react";
import { render } from "@testing-library/react";
import { AssertEqual } from "@tagged-state/testutils";
import { StateVariant } from "@tagged-state/core";
import ElementGuard, { StateElementProps } from "./ElementGuard";

describe("StateElementProps", () => {
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

    const assert1: AssertEqual<StateElementProps<State>, Expected> = true;
  });
});

describe("ElementGuard", () => {
  it("renders properly", () => {
    type ReadyProps = { someVal: string };
    type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

    const uninit = <>uninit variant</>;
    const ready = <>ready variant</>;

    const view = render(
      <ElementGuard<State>
        taggedState={{ tag: "uninit", data: {} }}
        uninit={uninit}
        ready={ready}
      />
    );

    expect(view.baseElement).toHaveTextContent("uninit variant");
    expect(view.baseElement).not.toHaveTextContent("ready variant");
  });
});
