export type EmptyObject = {
  [K in any]: never;
};

export type StateVariant<
  Tag extends string,
  Data extends { [key: string]: any } = EmptyObject
> = { tag: Tag; data: Data };

export type AnyTaggedState<Tag extends string = any> = StateVariant<Tag, any>;

export type StateProps<State extends AnyTaggedState> = {
  [Tag in State["tag"]]: Extract<State, { tag: Tag }>["data"];
};
