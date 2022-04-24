import React, { useContext } from "react";
import { AnyTaggedState } from "@tagged-state/core";
import Guard, { StateComponentProps } from "./Guard";

export type ContextGuardProps<
  State extends AnyTaggedState<Tag>,
  Tag extends string
> = StateComponentProps<State, Tag>;

function createContextGuard<
  Context extends React.Context<State>,
  State extends AnyTaggedState<Tag> = React.ContextType<Context>,
  Tag extends string = any
>(context: Context): React.VFC<ContextGuardProps<State, Tag>> {
  function ContextGuard(
    props: ContextGuardProps<State, Tag>
  ): React.ReactElement<
    React.ComponentProps<StateComponentProps<State>[Tag]>,
    StateComponentProps<State>[Tag]
  > {
    const taggedState = useContext(context);
    return <Guard<State, Tag> {...props} taggedState={taggedState} />;
  }
  return ContextGuard;
}

export default createContextGuard;
