import React from "react";
import { AnyTaggedState } from "@tagged-state/core";
import createComponentGuard from "./createComponentGuard";
import createElementGuard from "./createElementGuard";

function create<State extends AnyTaggedState>(initialState: State) {
  const Context = React.createContext<State>(initialState);
  const ComponentGuard = createComponentGuard(Context);
  const ElementGuard = createElementGuard(Context);
  return {
    Context,
    ElementGuard,
    ComponentGuard,
  };
}

export default create;
