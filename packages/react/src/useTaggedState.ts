import React, { useContext } from "react";
import {
  AnyTaggedState,
  StateProps,
  UnexpectedStateError,
} from "@tagged-state/core";

// Expect a given `context` to be at a certain state specified with `tag`,
// returning the data for the state, or throwing an error if the context is at
// a state other than the expected one.
//
// Hint: use `as const` when specifying the `tag` to make the type system elides
// the type of the returned state properly.
//
// Example:
//
//    const readyState = useTaggedState(MyContext, "ready" as const);
//
function useTaggedState<ExpectedTag, State extends AnyTaggedState>(
  context: React.Context<State>,
  expectedTag: ExpectedTag
): StateProps<State>[ExpectedTag & State["tag"]] {
  const taggedState = useContext(context);
  const { tag, data } = taggedState;
  if (tag !== expectedTag) {
    throw new UnexpectedStateError(expectedTag, tag);
  }
  return data;
}

export default useTaggedState;
