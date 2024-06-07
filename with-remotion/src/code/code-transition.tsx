import { continueRender, delayRender, useCurrentFrame } from "remotion"
import { Pre, AnnotationHandler, HighlightedCode } from "codehike/code"
import React, { useLayoutEffect, useState } from "react"
import {
  calculateTransitions,
  getStartingSnapshot,
  TokenTransition,
  TokenTransitionsSnapshot,
} from "./token-transitions"
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
  const [snapshot, setSnapshot] = useState<TokenTransitionsSnapshot>()
  const [handle] = React.useState(() => delayRender())
  const prevCode = oldCode || { ...newCode, tokens: [], annotations: [] }

  useLayoutEffect(() => {
    if (!snapshot) {
      setSnapshot(getStartingSnapshot(ref.current!))
      return
    }
    const transitions = calculateTransitions(ref.current!, snapshot)
    transitions.forEach(({ element, keyframes, options }) => {
      tweenStyle(
        element,
        keyframes,
        frame,
        durationInFrames * options.delay,
        durationInFrames * options.duration
      )
    })
    continueRender(handle)
  })

  return (
    <Pre
      ref={ref}
      code={!snapshot ? prevCode : newCode}
      handlers={[inlineBlockTokens, mark]}
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

const inlineBlockTokens: AnnotationHandler = {
  name: "code-transition",
  Token: ({ value, style }) => {
    return <span style={{ ...style, display: "inline-block" }}>{value}</span>
  },
}

function tweenStyle(
  element: HTMLElement,
  keyframes: TokenTransition["keyframes"],
  frame: number,
  frameDelay: number,
  frameDuration: number
) {
  let { translateX, translateY, color, opacity } = keyframes
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
