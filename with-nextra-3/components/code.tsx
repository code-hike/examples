import { HighlightedCode, Pre } from "codehike/code"
import { callout } from "./annotations/callout"

export function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <Pre
      code={codeblock}
      handlers={[callout]}
      className="border border-zinc-500/50 rounded py-2 px-4 my-4"
      style={codeblock.style}
    />
  )
}
