// @ts-ignore
import { getBlocks } from "./content.md"
import { ScrollyStep, Step, Steps } from "codehike/scrolly"
import { CodeContent, CodeBlock } from "codehike"

type Blocks = {
  intro: {
    query: string
    children: React.ReactNode[]
  }
  steps: StepBlock[]
  outro: {
    children: React.ReactNode[]
  }
}

type StepBlock = {
  query: string
  code: CodeBlock
  children: React.ReactNode[]
}

export default function Page() {
  const { intro, steps, outro } = getBlocks() as Blocks
  return (
    <main>
      <h1>{intro.query}</h1>
      {intro.children}
      <Scrollycoding steps={steps} />
      {outro.children}
    </main>
  )
}

function Scrollycoding({ steps }: { steps: StepBlock[] }) {
  return (
    <Steps
      className="flex gap-4"
      steps={steps.map((step) => ({
        sticker: <Code codeblock={step.code} />,
      }))}
    >
      <ScrollableContent steps={steps} />
      <div className="w-[40vw] max-w-xl bg-zinc-900">
        <div className="top-16 sticky">
          <Step element="sticker" />
        </div>
      </div>
    </Steps>
  )
}

function ScrollableContent({ steps }: { steps: StepBlock[] }) {
  return (
    <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert">
      {steps.map((step, i) => (
        <ScrollyStep
          key={i}
          stepIndex={i}
          className={
            "border-l-4 border-zinc-700 data-[ch-selected]:border-blue-400" +
            " px-5 py-2 mb-24 rounded bg-zinc-900"
          }
        >
          <h2 className="mt-4 text-xl">{step.query}</h2>
          <div>{step.children}</div>
        </ScrollyStep>
      ))}
    </div>
  )
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-dark" }}
      className="min-h-[40rem]"
    />
  )
}
