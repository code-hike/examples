import type { MDXComponents } from "mdx/types"
import defaultComponents from "fumadocs-ui/mdx"
import { Code } from "@/components/code"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...components,
    Code,
  }
}
