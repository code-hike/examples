// @ts-ignore
import { getBlocks } from "./content.md"
import { CodeContent, CodeBlock } from "codehike"
import { Slides, Controls } from "./slides"

type Blocks = {
  steps: StepBlock[]
}

type StepBlock = {
  query: string
  code: CodeBlock
  children: React.ReactNode[]
}

export default function Page() {
  const { steps } = getBlocks() as Blocks
  const slides = steps.map((step: any) => (
    <div>
      <Controls length={steps.length} />
      <Code codeblock={step.code} />
      <Controls length={steps.length} />
      <div className="h-40 px-6">{step.children}</div>
    </div>
  ))

  return <Slides slides={slides} />
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-dark" }}
      className="min-h-[40rem] !bg-zinc-900 m-0 rounded-none"
    />
  )
}
