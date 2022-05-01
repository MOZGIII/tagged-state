import { StateVariant } from "./taggedState";

export type DelegatedFlatStateVariant<
  Tag extends string,
  To extends { [K in "tag" | string]: K extends "tag" ? Tag : To[K] }
> = StateVariant<Tag, Omit<Extract<To, { tag: Tag }>, "tag">>;
