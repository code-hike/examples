import { continueRender, delayRender, useCurrentFrame } from "remotion"
import { Pre, AnnotationHandler, HighlightedCode } from "codehike/code"
import React from "react"
import {
  calculateTransitions,
  getStartingSnapshot,
  maxDuration,
  TokenTransitionsSnapshot,
} from "./animate-tokens"
import {
  interpolateColorsWithDelay as tweenColor,
  interpolateWithDelay as tween,
} from "./utils"

export function CodeTransition({
  oldCode,
  newCode,
  durationInFrames = 30,
}: {
  oldCode?: HighlightedCode
  newCode: HighlightedCode
  durationInFrames?: number
}) {
  const frame = useCurrentFrame()
  const ref = React.useRef<HTMLPreElement>(null)
  const [firstSnapshot, setSnapshot] =
    React.useState<TokenTransitionsSnapshot>()
  const [handle] = React.useState(() => delayRender())

  const prevCode = oldCode || { ...newCode, tokens: [], annotations: [] }

  React.useLayoutEffect(() => {
    if (!firstSnapshot) {
      setSnapshot(getStartingSnapshot(ref.current!))
    } else {
      const transitions = calculateTransitions(ref.current!, firstSnapshot)
      transitions.forEach(({ element, keyframes: style, options }) => {
        const frameDelay = (durationInFrames * options.delay) / maxDuration
        const frameDuration =
          (durationInFrames * options.duration) / maxDuration

        interpolateStyle(style, element, frame, frameDelay, frameDuration)
      })

      continueRender(handle)
    }
  })

  return (
    <Pre
      ref={ref}
      code={!firstSnapshot ? prevCode : newCode}
      handlers={[h, mark]}
      style={{ position: "relative", fontSize: 20, lineHeight: 1.5 }}
    />
  )
}

const mark: AnnotationHandler = {
  name: "mark",
  Inline: ({ children, annotation }) => {
    const [color = "blue", delay = 20, duration = 10] =
      annotation.query.split(" ")
    const frame = useCurrentFrame()
    const backgroundColor = tweenColor(frame, +delay, +duration, [
      "rgba(0, 0, 0, 0)",
      color,
    ])

    return (
      <div
        style={{
          display: "inline-block",
          backgroundColor,
          borderRadius: 4,
          padding: "0 .125rem",
          margin: "0 -.125rem",
        }}
      >
        {children}
      </div>
    )
  },
}

const h: AnnotationHandler = {
  name: "transition",
  Token: ({ value, style }) => {
    return <span style={{ ...style, display: "inline-block" }}>{value}</span>
  },
}

function interpolateStyle(
  style: {
    translateX?: [number, number] | undefined
    translateY?: [number, number] | undefined
    color?: [string, string] | undefined
    opacity?: [number, number] | undefined
  },
  element: HTMLElement,
  frame: number,
  frameDelay: number,
  frameDuration: number
) {
  let { translateX, translateY, color, opacity } = style
  if (opacity) {
    element.style.opacity = tween(
      frame,
      frameDelay,
      frameDuration,
      opacity
    ).toString()
  }
  if (color) {
    element.style.color = tweenColor(frame, frameDelay, frameDuration, color)
  }
  if (translateX || translateY) {
    const x = tween(frame, frameDelay, frameDuration, translateX!)
    const y = tween(frame, frameDelay, frameDuration, translateY!)
    element.style.translate = `${x}px ${y}px`
  }
}
