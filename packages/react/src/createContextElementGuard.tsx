import React, { useContext } from "react";
import { AnyTaggedState } from "@tagged-state/core";
import ElementGuard, { StateElementProps } from "./ElementGuard";

export type ContextElementGuardProps<
  State extends AnyTaggedState<Tag>,
  Tag extends string,
> = StateElementProps<State, Tag>;

function createContextElementGuard<
  Context extends React.Context<State>,
  State extends AnyTaggedState<Tag> = React.ContextType<Context>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any,
>(context: Context): React.FC<ContextElementGuardProps<State, Tag>> {
  function ContextElementGuard(
    props: ContextElementGuardProps<State, Tag>,
  ): React.ReactElement {
    const taggedState = useContext(context);
    return <ElementGuard taggedState={taggedState} {...props} />;
  }

  return ContextElementGuard;
}

export default createContextElementGuard;
