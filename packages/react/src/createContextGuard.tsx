import React, { useContext } from "react";
import { AnyTaggedState, StateProps } from "@tagged-state/core";

export type StateGuardProps<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
> = {
  [Tag in keyof StateProps<State>]: React.ReactElement;
};

export type ContextGuardProps<
  State extends AnyTaggedState<Tag>,
  Tag extends string
> = StateGuardProps<State, Tag>;

function createContextGuard<
  Context extends React.Context<State>,
  State extends AnyTaggedState<Tag> = React.ContextType<Context>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
>(context: Context): React.FC<ContextGuardProps<State, Tag>> {
  function ContextGuard(
    props: ContextGuardProps<State, Tag>
  ): React.ReactElement {
    const taggedState = useContext(context);
    return props[taggedState.tag];
  }
  return ContextGuard;
}

export default createContextGuard;
