import {
  continueRender,
  delayRender,
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
import { interpolateColorsWithDelay, interpolateWithDelay } from "./utils"
import { ProgressBar } from "./progress-bar"

export const Video = ({ blocks }) => {
  const { durationInFrames } = useVideoConfig()
  const stepDuration = durationInFrames / blocks.length
  const transitionDuration = stepDuration * 0.4

  return (
    <AbsoluteFill style={{ backgroundColor: "#111", color: "white" }}>
      <ProgressBar steps={blocks} />
      {blocks.map((block, index) => (
        <Sequence
          from={stepDuration * index}
          durationInFrames={stepDuration}
          name={block.title}
        >
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
      handlers={[h, mark]}
      style={{ position: "relative", fontSize: 20 }}
    />
  )
}

const mark: AnnotationHandler = {
  name: "mark",
  Inline: ({ children }) => {
    const frame = useCurrentFrame()
    const backgroundColor = interpolateColorsWithDelay(frame, 20, 20, [
      "rgba(0, 0, 0, 0)",
      "rgba(220, 0, 120, 0.5)",
    ])

    return (
      <span style={{ backgroundColor, borderRadius: 4, padding: "0 4px" }}>
        {children}
      </span>
    )
  },
}

const h: AnnotationHandler = {
  name: "transition",
  Token: ({ value, style }) => {
    return <span style={{ ...style, display: "inline-block" }}>{value}</span>
  },
}
