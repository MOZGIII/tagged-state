import React from "react";
import { AnyTaggedState, StateProps } from "@tagged-state/core";
import useTaggedState from "./useTaggedState";

type Props<
  ExpectedTag,
  State extends AnyTaggedState<Tag>,
  Tag extends string,
> = {
  context: React.Context<State>;
  tag: ExpectedTag;
  children: React.ComponentType<StateProps<State>[ExpectedTag & State["tag"]]>;
};

// Expect a given `context` to be at a certain state specified with `tag`,
// passing the data for the state to the children as props, or throwing
// an error if the context is at a state other than the expected one.
//
// Hint: use `as const` when specifying the `tag` to make the type system elides
// the type of the returned state properly.
//
// Example:
//
//    <ExpectContextState context={MyContext} tag={"ready" as const}>
//      {ready}
//    </ExpectContextState>
//
function ExpectContextState<
  ExpectedTag,
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any,
>(props: Props<ExpectedTag, State, Tag>) {
  const { context, tag } = props;
  const taggedState = useTaggedState<ExpectedTag, State>(context, tag);
  const { children: Children } = props;
  return <Children {...taggedState} />;
}

export default ExpectContextState;
