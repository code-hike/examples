import { Block, HighlightedCodeBlock, parseRoot } from "codehike/blocks"
import { z } from "zod"
import { AbsoluteFill, Composition, Sequence } from "remotion"
import React from "react"
import { ProgressBar } from "./progress-bar"
import { Code } from "./code"
import { createTwoslashFromCDN } from "twoslash-cdn"

import Content from "./content.md"
import { Pre, highlight } from "codehike/code"
const { code } = parseRoot(
  Content,
  Block.extend({ code: z.array(HighlightedCodeBlock) })
)

const STEP_DURATION = 120

const twoslash = createTwoslashFromCDN()
const theme = "github-dark"

// based on https://codehike.org/docs/code/twoslash
async function calculateMetadata() {
  const twoslashPromises = code.map(async (step) => {
    const { code, queries, errors } = await twoslash.run(
      step.value,
      step.lang,
      { compilerOptions: { lib: ["dom"] } }
    )
    const highlighted = await highlight({ ...step, value: code }, theme)

    await Promise.all(
      queries.map(async ({ text, line, character, length }) => {
        const codeblock = await highlight({ value: text, lang: "ts" }, theme)
        highlighted.annotations.push({
          name: "callout",
          query: text,
          lineNumber: line + 1,
          data: {
            character,
            codeblock,
          },
          fromColumn: character,
          toColumn: character + length,
        })
      })
    )

    errors.forEach(({ text, line, character, length }) => {
      highlighted.annotations.push({
        name: "error",
        lineNumber: line + 1,
        fromColumn: character,
        toColumn: character + length,
        data: { character, children: text },
      })
    })

    return highlighted
  })

  return {
    durationInFrames: code.length * STEP_DURATION,
    props: {
      steps: await Promise.all(twoslashPromises),
    },
  }
}

export default function RemotionRoot() {
  return (
    <Composition
      id="Matt"
      component={Video}
      defaultProps={{ steps: code }}
      calculateMetadata={calculateMetadata}
      fps={60}
      width={560}
      height={560}
    />
  )
}

function Video({ steps }) {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0D1117" }}>
      <ProgressBar steps={steps} />
      {steps.map((step, index) => (
        <Sequence
          key={index}
          from={STEP_DURATION * index}
          durationInFrames={STEP_DURATION}
          name={step.meta}
          style={{ padding: "42px 24px" }}
        >
          <Code
            oldCode={steps[index - 1]}
            newCode={step}
            durationInFrames={90}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
