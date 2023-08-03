import React from "react";
import { AnyTaggedState, StateProps } from "@tagged-state/core";

export type StateComponentProps<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
> = {
  [Tag in keyof StateProps<State>]: React.ComponentType<StateProps<State>[Tag]>;
};

export type StateElementProps<
  State extends AnyTaggedState<Tag>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tag extends string = any
> = {
  [Tag in keyof StateProps<State>]: React.ReactElement;
};
