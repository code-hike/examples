import {
  continueRender,
  delayRender,
  interpolate,
  interpolateColors,
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"
import { Pre, AnnotationHandler } from "codehike/code"
import React from "react"
import {
  animateChange,
  getFirstSnapshot,
  maxDuration,
  SnapshotElement,
} from "./animate-tokens"

export const HelloWorld = ({ blocks }) => {
  const { durationInFrames } = useVideoConfig()
  const stepDuration = durationInFrames / blocks.length
  const transitionDuration = stepDuration * 0.4

  return (
    <AbsoluteFill style={{ backgroundColor: "#111", color: "white" }}>
      <ProgressBar steps={blocks} />
      {blocks.map((block, index) => (
        <Sequence from={stepDuration * index} durationInFrames={stepDuration}>
          <div style={{ padding: "42px 24px" }}>
            <CodeTransition
              oldCode={blocks[index - 1]?.code}
              newCode={block.code}
              durationInFrames={transitionDuration}
            />
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}

function ProgressBar({ steps }) {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const stepDuration = durationInFrames / steps.length
  const currentStep = Math.floor(frame / stepDuration)
  const currentStepProgress = (frame % stepDuration) / stepDuration

  return (
    <div
      style={{
        position: "absolute",
        top: 24,
        left: 24,
        right: 24,
        height: 2,
        display: "flex",
        gap: 6,
      }}
    >
      {steps.map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#333",
            borderRadius: 6,
            overflow: "hidden",
            height: "100%",
            flex: 1,
          }}
        >
          <div
            style={{
              height: "100%",
              width:
                index > currentStep
                  ? 0
                  : index === currentStep
                  ? currentStepProgress * 100 + "%"
                  : "100%",
              backgroundColor: "white",
            }}
          />
        </div>
      ))}
    </div>
  )
}

function CodeTransition({ oldCode, newCode, durationInFrames = 30 }) {
  const frame = useCurrentFrame()
  const ref = React.useRef<HTMLPreElement>(null)
  const [firstSnapshot, setSnapshot] = React.useState<SnapshotElement[]>()
  const [handle] = React.useState(() => delayRender())

  React.useLayoutEffect(() => {
    if (!oldCode) {
      continueRender(handle)
      return
    }
    if (!firstSnapshot) {
      console.log("first snapshot")
      setSnapshot(getFirstSnapshot(ref.current!))
    } else {
      const transitions = animateChange(ref.current!, firstSnapshot)
      console.log("continue render", transitions)

      transitions.forEach(({ element, style, options }) => {
        const frameDelay = (durationInFrames * options.delay) / maxDuration
        const frameDuration =
          (durationInFrames * options.duration) / maxDuration

        let { dx, dy, color, opacity } = style
        if (opacity) {
          element.style.opacity = interpolateWithDelay(
            frame,
            frameDelay,
            frameDuration,
            opacity
          ) as any
        }
        if (color) {
          element.style.color = interpolateColorsWithDelay(
            frame,
            frameDelay,
            frameDuration,
            color
          )
        }
        if (dx || dy) {
          const x = dx
            ? interpolateWithDelay(frame, frameDelay, frameDuration, dx)
            : 0
          const y = dy
            ? interpolateWithDelay(frame, frameDelay, frameDuration, dy)
            : 0
          element.style.transform = `translate(${x}px, ${y}px)`
        }
      })
      continueRender(handle)
    }
  })

  return (
    <Pre
      ref={ref}
      code={oldCode && !firstSnapshot ? oldCode : newCode}
      handlers={[h]}
      style={{ position: "relative", fontSize: 20 }}
    />
  )
}

const h: AnnotationHandler = {
  name: "transition",
  Token: ({ value, style }) => {
    return <span style={{ ...style, display: "inline-block" }}>{value}</span>
  },
}

function interpolateWithDelay(
  frame: number,
  delay: number,
  duration: number,
  [from, to]: [number, number]
) {
  if (frame < delay) {
    return from
  }
  if (frame > delay + duration) {
    return to
  }
  return interpolate(frame - delay, [0, duration], [from, to])
}

function interpolateColorsWithDelay(
  frame: number,
  delay: number,
  duration: number,
  [from, to]: [string, string]
) {
  if (frame < delay) {
    return from
  }
  if (frame > delay + duration) {
    return to
  }
  return interpolateColors(frame - delay, [0, duration], [from, to])
}
