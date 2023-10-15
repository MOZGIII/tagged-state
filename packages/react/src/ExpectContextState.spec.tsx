import React from "react";
import { render } from "@testing-library/react";
import { StateVariant, UnexpectedStateError } from "@tagged-state/core";
import ExpectContextState from "./ExpectContextState";

describe("ExpectContextState", () => {
  it("renders properly when state matches", () => {
    type ReadyProps = { someVal: string };

    type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

    const Test = React.createContext<State>({
      tag: "ready",
      data: { someVal: "world" },
    });

    const ready = jest.fn(((props) => (
      <>hello {props.someVal}</>
    )) as React.VFC<ReadyProps>);

    const view = render(
      <ExpectContextState context={Test} tag={"ready" as const}>
        {ready}
      </ExpectContextState>,
    );

    expect(view.baseElement).toHaveTextContent("hello world");
    expect(ready).toHaveBeenCalledTimes(1);
  });

  it("throws when state doesn't match", () => {
    type ReadyProps = { someVal: string };

    type State = StateVariant<"uninit"> | StateVariant<"ready", ReadyProps>;

    const Test = React.createContext<State>({ tag: "uninit", data: {} });

    const ready = jest.fn(((props) => (
      <>hello {props.someVal}</>
    )) as React.VFC<ReadyProps>);

    jest.spyOn(global.console, "error").mockImplementation();

    expect(() => {
      render(
        <ExpectContextState context={Test} tag={"ready" as const}>
          {ready}
        </ExpectContextState>,
      );
    }).toThrow(new UnexpectedStateError("ready", "uninit"));
  });
});
