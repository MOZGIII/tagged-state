import { AnyTaggedState, StateProps } from "@tagged-state/core";
import useTaggedState from "./useTaggedState";

export type TaggedStateHook<
  ExpectedTag,
  State extends AnyTaggedState
> = () => StateProps<State>[ExpectedTag & State["tag"]];

function createTaggedStateHook<ExpectedTag, State extends AnyTaggedState>(
  context: React.Context<State>,
  expectedTag: ExpectedTag
): TaggedStateHook<ExpectedTag, State> {
  return () => useTaggedState(context, expectedTag);
}

export default createTaggedStateHook;
