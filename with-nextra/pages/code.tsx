import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return <Pre code={codeblock} style={{ background: "black" }} />
}
