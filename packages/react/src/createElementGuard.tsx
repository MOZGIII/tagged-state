import React, { useContext } from "react";
import { AnyTaggedState } from "@tagged-state/core";
import ElementGuard, { StateElementGuardProps } from "./ElementGuard";

export type ElementGuardProps<
  State extends AnyTaggedState<Tag>,
  Tag extends string
> = StateElementGuardProps<State, Tag>;

function createElementGuard<
  Context extends React.Context<State>,
  State extends AnyTaggedState<Tag> = React.ContextType<Context>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
>(context: Context): React.FC<ElementGuardProps<State, Tag>> {
  function ContextGuard(
    props: ElementGuardProps<State, Tag>
  ): React.ReactElement {
    const taggedState = useContext(context);
    return <ElementGuard taggedState={taggedState} {...props} />;
  }

  return ContextGuard;
}

export default createElementGuard;
