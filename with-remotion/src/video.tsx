import { AbsoluteFill, Sequence, useVideoConfig } from "remotion"
import React from "react"
import { ProgressBar } from "./progress-bar"
import { CodeTransition } from "./code-transition"
import { HighlightedCode } from "codehike/code"

export const Video = (props: { steps: HighlightedCode[] }) => {
  const { steps } = props
  const { durationInFrames } = useVideoConfig()
  const stepDuration = durationInFrames / steps.length
  const transitionDuration = stepDuration * 0.4

  return (
    <AbsoluteFill style={{ backgroundColor: "#0D1117" }}>
      <ProgressBar steps={steps} />
      {steps.map((step, index) => (
        <Sequence
          from={stepDuration * index}
          durationInFrames={stepDuration}
          name={step.meta}
        >
          <div style={{ padding: "42px 24px" }}>
            <CodeTransition
              oldCode={steps[index - 1]}
              newCode={step}
              durationInFrames={transitionDuration}
            />
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
