import { StateVariant } from "./taggedState";

// Create a tagged state variant instance from the provided arguments.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mkts<Tag extends string, Data extends { [key: string]: any }>(
  tag: Tag,
  data: Data,
): StateVariant<Tag, Data> {
  return { tag, data };
}

export default mkts;
