import React, { useContext } from "react";
import { AnyTaggedState } from "@tagged-state/core";
import ComponentGuard, { StateComponentProps } from "./types";

export type ContextComponentGuardProps<
  State extends AnyTaggedState<Tag>,
  Tag extends string
> = StateComponentProps<State, Tag>;

function createContextComponentGuard<
  Context extends React.Context<State>,
  State extends AnyTaggedState<Tag> = React.ContextType<Context>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
>(context: Context): React.FC<ContextComponentGuardProps<State, Tag>> {
  function ContextComponentGuard(
    props: ContextComponentGuardProps<State, Tag>
  ): React.ReactElement<
    React.ComponentProps<StateComponentProps<State>[Tag]>,
    StateComponentProps<State>[Tag]
  > {
    const taggedState = useContext(context);
    return <ComponentGuard<State, Tag> {...props} taggedState={taggedState} />;
  }
  return ContextComponentGuard;
}

export default createContextComponentGuard;
