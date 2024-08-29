import { compileMDX } from "next-mdx-remote/rsc"
import { promises as fs } from "fs"
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from "codehike/mdx"
import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "../../components/annotations/callout"
import { Scrollycoding } from "./scrollycoding"
import Link from "next/link"

const components = { Code, Scrollycoding }

const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
}

export default async function Home() {
  const source = await fs.readFile("./content/scrollycoding.mdx", "utf-8")

  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      },
    },
  })
  return (
    <main
      style={{
        padding: "1rem",
        margin: "0 auto",
        maxWidth: "800px",
        fontFamily: "sans-serif",
      }}
    >
      <Link href="/">Back</Link>
      {content}
    </main>
  )
}

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      style={{ ...highlighted.style, padding: "1rem", borderRadius: "0.5rem" }}
      handlers={[callout]}
    />
  )
}
