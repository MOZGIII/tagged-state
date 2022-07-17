/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { render } from "@testing-library/react";
import { StateVariant } from "@tagged-state/core";
import createElementGuard from "./createElementGuard";

describe("ElementGuard", () => {
  const UninitComponent = () => <>uninit variant</>;
  const ReadyComponent = () => <>ready variant</>;
  it("renders properly", () => {
    type ReadyProps = { someVal: string };

    type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

    const Test = React.createContext<State>({ tag: "uninit", data: {} });

    const ElementGuard = createElementGuard(Test);

    const view = render(
      <ElementGuard uninit={<UninitComponent />} ready={<ReadyComponent />} />
    );

    expect(view.baseElement).toHaveTextContent("uninit variant");
    expect(view.baseElement).not.toHaveTextContent("ready variant");
  });
});
