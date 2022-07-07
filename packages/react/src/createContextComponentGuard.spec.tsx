/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render } from "@testing-library/react";
import { StateVariant } from "@tagged-state/core";
import createContextComponentGuard from "./createContextComponentGuard";

describe("ContextGuard", () => {
  it("renders properly", () => {
    type ReadyProps = { someVal: string };

    type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

    const Test = React.createContext<State>({ tag: "uninit", data: {} });

    const uninit = () => <>uninit variant</>;
    const ready = jest.fn();

    const ContextGuard = createContextComponentGuard(Test);

    const view = render(<ContextGuard uninit={uninit} ready={ready} />);

    expect(view.baseElement).toHaveTextContent("uninit variant");
    expect(ready).not.toBeCalled();
  });
});
