import type { MDXComponents } from "mdx/types"
import { ProseCode } from "./components/code"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ProseCode,
  }
}
