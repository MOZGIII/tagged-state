import { StateVariant } from "./taggedState";

// Create a tagged state variant instance from the provided arguments.
function mkts<
  const Tag extends string,
  const Data extends { [key: string]: any },
>(tag: Tag, data: Data): StateVariant<Tag, Data> {
  return { tag, data };
}

export default mkts;
