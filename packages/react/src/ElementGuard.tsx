import React from "react";
import { AnyTaggedState, StateProps } from "@tagged-state/core";

export type StateElementGuardProps<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
> = {
  [Tag in keyof StateProps<State>]: React.ReactElement;
};

type Props<State extends AnyTaggedState<Tag>, Tag extends string> = {
  taggedState: State;
} & StateElementGuardProps<State, Tag>;

function ElementGuard<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
>(props: Props<State, Tag>): React.ReactElement {
  const { taggedState } = props;
  const { tag } = taggedState;
  const Component = props[tag];
  return Component;
}

export default ElementGuard;
