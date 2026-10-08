import type { MDXComponents } from "mdx/types";

// Post typography lives in `.prose` (globals.css); nothing to override per element yet.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
