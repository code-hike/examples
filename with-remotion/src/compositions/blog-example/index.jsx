import React from "react"
import { z } from "zod"
import { Block, HighlightedCodeBlock, parseRoot } from "codehike/blocks"
import {
  AbsoluteFill,
  Composition,
  Sequence,
  interpolateColors,
  useCurrentFrame,
} from "remotion"
import { InnerLine, Pre } from "codehike/code"
import { tokenTransitions, useTokenTransitions } from "./token-transitions"

import Content from "./content.md"
const Schema = Block.extend({
  steps: z.array(
    Block.extend({
      code: HighlightedCodeBlock,
    })
  ),
})
const { steps } = parseRoot(Content, Schema)

function Video({ steps }) {
  return (
    <AbsoluteFill
      style={{
        background: "#0D1117",
        alignItems: "center",
        fontSize: 24,
      }}
    >
      {steps.map((step, index) => (
        <Sequence
          layout="none"
          key={index}
          from={STEP_FRAMES * index}
          durationInFrames={STEP_FRAMES}
          name={step.title}
        >
          <Code oldCode={steps[index - 1]?.code} newCode={step.code} />
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}

function Code({ oldCode, newCode }) {
  const { code, ref } = useTokenTransitions(oldCode, newCode, STEP_FRAMES)
  return <Pre ref={ref} code={code} handlers={[mark, tokenTransitions]} />
}

const mark = {
  name: "mark",
  Line: (props) => <InnerLine merge={props} style={{ padding: "0 4px" }} />,
  Block: ({ children, annotation }) => {
    const delay = +(annotation.query || 0)
    const frame = useCurrentFrame()
    const background = interpolateColors(
      frame,
      [delay, delay + 10],
      ["#0000", "#F2CC6044"],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    )

    return <div style={{ background }}>{children}</div>
  },
}

const STEP_FRAMES = 60
export default function () {
  return (
    <Composition
      id="BlogExample"
      component={Video}
      defaultProps={{ steps }}
      durationInFrames={STEP_FRAMES * steps.length}
      fps={60}
      width={140 * 2}
      height={90 * 2}
    />
  )
}
