export type EmptyObject = Record<string, never>;

export type StateVariant<
  Tag extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data extends { [key: string]: any } = EmptyObject,
> = { tag: Tag; data: Data };

export type DelegatedFlatStateVariant<
  Tag extends string,
  To extends { [K in string]: K extends "tag" ? Tag : To[K] },
> = StateVariant<Tag, Omit<Extract<To, { tag: Tag }>, "tag">>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyTaggedState<Tag extends string = any> = StateVariant<Tag, any>;

export type StateProps<State extends AnyTaggedState> = {
  [Tag in State["tag"]]: Extract<State, { tag: Tag }>["data"];
};
