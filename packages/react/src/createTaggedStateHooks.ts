import { AnyTaggedState } from "@tagged-state/core";
import createTaggedStateHook, {
  TaggedStateHook,
} from "./createTaggedStateHook";

export type TaggedStateHooks<ExpectedTags, State extends AnyTaggedState> = {
  [K in ExpectedTags & string as `use${Capitalize<K>}`]: () => TaggedStateHook<
    ExpectedTags,
    State
  >;
};

function createTaggedStateHooks<
  ExpectedTags extends string,
  State extends AnyTaggedState<Tag>,
  Tag extends string,
>(
  context: React.Context<State>,
  expectTags: readonly ExpectedTags[],
): TaggedStateHooks<ExpectedTags, State> {
  return expectTags.reduce(
    (acc, tag) => {
      const hookName =
        tag.length === 0 ? tag : tag[0].toUpperCase() + tag.slice(1);
      return {
        ...acc,
        [`use${hookName}`]: createTaggedStateHook(context, tag),
      };
    },
    {} as TaggedStateHooks<ExpectedTags, State>,
  );
}

export default createTaggedStateHooks;
