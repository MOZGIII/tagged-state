import React from "react";
import { AnyTaggedState } from "@tagged-state/core";
import createContextGuard from "./createContextGuard";

function create<State extends AnyTaggedState>(initialState: State) {
  const Context = React.createContext<State>(initialState);
  const Guard = createContextGuard(Context);
  return {
    Context,
    Guard,
  };
}

export default create;
