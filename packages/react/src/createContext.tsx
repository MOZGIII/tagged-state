import React from "react";
import { AnyTaggedState } from "@tagged-state/core";
import createContextComponentGuard from "./createContextComponentGuard";
import createContextElementGuard from "./createContextElementGuard";

function createContext<State extends AnyTaggedState>(initialState: State) {
  const Context = React.createContext<State>(initialState);
  const ComponentGuard = createContextComponentGuard(Context);
  const ElementGuard = createContextElementGuard(Context);
  return {
    Context,
    ElementGuard,
    ComponentGuard,
  };
}

export default createContext;
