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
import Content from "./foo.mdx"
import { z } from "zod"
import {
  Pre,
  RawCode,
  HighlightedCode,
  highlight,
  AnnotationHandler,
} from "codehike/code"
import { Block, HighlightedCodeBlock, parseRoot } from "codehike/blocks"
import React from "react"
import {
  animateChange,
  getFirstSnapshot,
  maxDuration,
  SnapshotElement,
  Transition,
} from "./animate-tokens"

const Schema = Block.extend({
  blocks: z.array(Block.extend({ code: HighlightedCodeBlock })),
})

export const HelloWorld = ({ titleText, titleColor }) => {
  const { blocks } = parseRoot(Content, Schema)

  const frame = useCurrentFrame()
  const { durationInFrames, fps } = useVideoConfig()

  // const stepIndex = (frame / durationInFrames) * blocks.length

  // const prevStep = blocks[Math.floor(stepIndex - 1)]
  // const currentStep = blocks[Math.floor(stepIndex)]

  return (
    <AbsoluteFill style={{ backgroundColor: "#111", color: "white" }}>
      <div style={{ padding: 12 }}>
        <CodeTransition
          oldCode={blocks[0].code}
          newCode={blocks[1].code}
          durationInFrames={durationInFrames}
        />
      </div>
    </AbsoluteFill>
  )
}

function CodeTransition({ oldCode, newCode, durationInFrames = 30 }) {
  const frame = useCurrentFrame()
  const ref = React.useRef<HTMLDivElement>(null)
  const [firstSnapshot, setSnapshot] = React.useState<SnapshotElement[]>()
  const [handle] = React.useState(() => delayRender())

  React.useLayoutEffect(() => {
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

  const oldPre = React.useMemo(
    () => (
      <Pre code={oldCode} handlers={[h]} style={{ position: "relative" }} />
    ),
    [oldCode]
  )
  const newPre = React.useMemo(
    () => (
      <Pre code={newCode} handlers={[h]} style={{ position: "relative" }} />
    ),
    [newCode]
  )

  return !firstSnapshot ? (
    <div ref={ref}>{oldPre}</div>
  ) : (
    <div ref={ref}>{newPre}</div>
  )
}

const h: AnnotationHandler = {
  name: "transition",
  Token: ({ value, style }) => {
    // React.useEffect(() => {
    //   console.log("span", value)
    // }, [])
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
