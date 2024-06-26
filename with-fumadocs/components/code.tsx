import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "./annotations/callout"

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-from-css")
  return (
    <Pre code={highlighted} handlers={[callout]} className="border bg-card" />
  )
}
