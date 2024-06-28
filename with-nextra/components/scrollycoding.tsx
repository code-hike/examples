import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks"
import { z } from "zod"
import { HighlightedCode, Pre, RawCode, highlight } from "codehike/code"
import { Selection, Selectable, SelectionProvider } from "codehike/utils"
import Link from "next/link"

const Schema = Block.extend({
  intro: Block,
  steps: z.array(Block.extend({ code: HighlightedCodeBlock })),
  outro: Block,
})

export function ScrollycodingLayout(props: unknown) {
  const { intro, steps, outro } = parseProps(props, Schema)
  return (
    <main>
      <Link href="/">Back</Link>
      <h1 className="mt-8">{intro.title}</h1>
      {intro.children}
      <SelectionProvider className="flex gap-4">
        <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert">
          {steps.map((step, i) => (
            <Selectable
              key={i}
              index={i}
              selectOn={["click", "scroll"]}
              className="border-l-4 border-zinc-700 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded bg-zinc-900"
            >
              <h2 className="mt-4 text-xl">{step.title}</h2>
              <div>{step.children}</div>
            </Selectable>
          ))}
        </div>
        <div className="w-[40vw] max-w-xl bg-zinc-900">
          <div className="top-4 sticky overflow-auto">
            <Selection
              from={steps.map((step) => (
                <Code codeblock={step.code} />
              ))}
            />
          </div>
        </div>
      </SelectionProvider>
      <h2>{outro.title}</h2>
      {outro.children}
    </main>
  )
}

function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return <Pre code={codeblock} className="min-h-[40rem] bg-transparent" />
}
