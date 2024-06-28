import { Pre } from "codehike/code"
import { callout } from "./callout"

export function Code({ codeblock }) {
  return (
    <Pre
      code={codeblock}
      className="border border-zinc-800 px-4 py-2 my-2 rounded bg-zinc-900 text-zinc-100"
      handlers={[callout]}
    />
  )
}
