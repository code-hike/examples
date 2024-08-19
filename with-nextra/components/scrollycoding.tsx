import { z } from "zod"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import { Block, HighlightedCodeBlock, parseProps } from "codehike/blocks"
import { HighlightedCode, Pre } from "codehike/code"

import { tokenTransitions } from "./annotations/token-transitions"
import { wordWrap } from "./annotations/word-wrap"

const Schema = Block.extend({
  steps: z.array(Block.extend({ code: HighlightedCodeBlock })),
})

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema)
  return (
    <SelectionProvider className="flex gap-4">
      <div className="flex-1 mt-32 mb-[90vh] ml-2 prose">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className="border-l-4 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded bg-card"
          >
            <h2 className="mt-4 text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="w-[40vw] max-w-xl bg-card">
        <div className="top-16 sticky overflow-auto">
          <Selection
            from={steps.map((step) => (
              <Code codeblock={step.code} />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}

function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <Pre
      code={codeblock}
      handlers={[tokenTransitions, wordWrap]}
      className="min-h-[40rem]"
    />
  )
}
