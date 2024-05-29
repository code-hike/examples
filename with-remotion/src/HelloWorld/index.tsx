import { spring } from "remotion"
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"
import { Logo } from "./Logo"
import { Subtitle } from "./Subtitle"
import { Title } from "./Title"
import Content from "./foo.mdx"
import { z } from "zod"
import { Pre, RawCode, HighlightedCode, highlight } from "codehike/code"
import { Block, CodeBlock, parseRoot } from "codehike/blocks"
import React from "react"

// TODO move to codehike
const HighlightedCodeBlock = CodeBlock.extend({
  code: z.string(),
  tokens: z.custom<HighlightedCode["tokens"]>(),
  annotations: z.custom<HighlightedCode["annotations"]>(),
  themeName: z.string(),
})

const Schema = Block.extend({
  blocks: z.array(Block.extend({ code: HighlightedCodeBlock })),
})

export const HelloWorld = ({ titleText, titleColor }) => {
  const { blocks } = parseRoot(Content, Schema)

  const frame = useCurrentFrame()
  const { durationInFrames, fps } = useVideoConfig()

  const stepIndex = (frame / durationInFrames) * blocks.length

  const prevStep = blocks[Math.floor(stepIndex - 1)]
  const currentStep = blocks[Math.floor(stepIndex)]

  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "#111", color: "white" }}>
      <div style={{ padding: 12 }}>
        <CodeTransition after={currentStep.code} before={prevStep?.code} />
      </div>
    </AbsoluteFill>
  )
}

function CodeTransition({ before, after }) {
  return <Pre code={after} />
}
