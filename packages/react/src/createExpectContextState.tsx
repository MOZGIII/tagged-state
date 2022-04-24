import { AnyTaggedState, StateProps } from "@tagged-state/core";
import ExpectContextState from "./ExpectContextState";

export type BoundExpectContextStateProps<
  ExpectedTag,
  State extends AnyTaggedState
> = {
  children: React.ComponentType<StateProps<State>[ExpectedTag & State["tag"]]>;
};

function createExpectContextState<
  ExpectedTag,
  Context extends React.Context<State>,
  State extends AnyTaggedState = React.ContextType<Context>
>(
  context: Context,
  tag: ExpectedTag
): React.VFC<BoundExpectContextStateProps<ExpectedTag, State>> {
  const BoundExpectContextState: React.VFC<
    BoundExpectContextStateProps<ExpectedTag, State>
  > = (props) => <ExpectContextState context={context} tag={tag} {...props} />;
  return BoundExpectContextState;
}

export default createExpectContextState;
