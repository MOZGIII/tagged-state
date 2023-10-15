import React from "react";
import { AnyTaggedState, StateProps } from "@tagged-state/core";

export type StateComponentProps<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any,
> = {
  [Tag in keyof StateProps<State>]: React.ComponentType<StateProps<State>[Tag]>;
};

type Props<State extends AnyTaggedState<Tag>, Tag extends string> = {
  taggedState: State;
} & StateComponentProps<State, Tag>;

function ComponentGuard<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any,
>(
  props: Props<State, Tag>,
): React.ReactElement<
  React.ComponentProps<StateComponentProps<State>[Tag]>,
  StateComponentProps<State>[Tag]
> {
  const { taggedState } = props;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { tag, data } = taggedState;
  const Component = props[tag];
  return <Component {...data} />;
}

export default ComponentGuard;
