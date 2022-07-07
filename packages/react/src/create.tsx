import React from "react";
import { AnyTaggedState } from "@tagged-state/core";
import createContextComponentGuard from "./createContextComponentGuard";
import createContextGuard from "./createContextGuard";

function create<State extends AnyTaggedState>(initialState: State) {
  const Context = React.createContext<State>(initialState);
  const Guard = createContextGuard(Context);
  const ComponentGuard = createContextComponentGuard(Context);
  return {
    Context,
    Guard,
    ComponentGuard,
  };
}

export default create;
