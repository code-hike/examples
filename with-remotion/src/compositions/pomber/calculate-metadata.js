import { Block, CodeBlock, parseRoot } from "codehike/blocks"
import { z } from "zod"

import Content from "./content.md"
import { highlight } from "codehike/code"

export async function calculateMetadata() {
  const { steps } = parseRoot(
    Content,
    Block.extend({
      steps: z.array(
        Block.extend({
          code: CodeBlock.optional(),
          content: CodeBlock.optional(),
          output: CodeBlock.optional(),
          duration: z.string().transform((v) => parseInt(v, 10)),
        })
      ),
    })
  )

  await Promise.all(
    steps.map(async (step) => {
      step.code = await h(step.code, "code.jsx")
      step.content = await h(step.content, "content.md")
      step.output = await h(step.output)
    })
  )

  return {
    durationInFrames: steps.reduce((acc, step) => acc + step.duration, 0),
    props: { steps },
  }
}

async function h(code, meta) {
  if (!code) return code
  if (code.meta == "focus") {
    code.focus = true
  }
  code.meta = meta
  return await highlight(code, "github-dark", {
    annotationPrefix: "!!",
  })
}
