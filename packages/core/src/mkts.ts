import { StateVariant } from "./taggedState";

// Create a tagged state variant instance from the provided arguments.
function mkts<Tag extends string, Data>(
  tag: Tag,
  data: Data
): StateVariant<Tag, Data> {
  return { tag, data };
}

export default mkts;
