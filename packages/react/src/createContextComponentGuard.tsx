import React, { useContext } from "react";
import { AnyTaggedState } from "@tagged-state/core";
import Guard, { StateComponentGuardProps } from "./Guard";

export type ContextComponentGuardProps<
  State extends AnyTaggedState<Tag>,
  Tag extends string
> = StateComponentGuardProps<State, Tag>;

function createContextComponentGuard<
  Context extends React.Context<State>,
  State extends AnyTaggedState<Tag> = React.ContextType<Context>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
>(context: Context): React.FC<ContextComponentGuardProps<State, Tag>> {
  function ContextGuard(
    props: ContextComponentGuardProps<State, Tag>
  ): React.ReactElement<
    React.ComponentProps<StateComponentGuardProps<State>[Tag]>,
    StateComponentGuardProps<State>[Tag]
  > {
    const taggedState = useContext(context);
    return <Guard<State, Tag> {...props} taggedState={taggedState} />;
  }
  return ContextGuard;
}

export default createContextComponentGuard;
