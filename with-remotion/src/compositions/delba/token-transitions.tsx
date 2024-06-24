import { Easing, continueRender, delayRender, useCurrentFrame } from "remotion"
import { interpolate, interpolateColors } from "remotion"
import React, { useLayoutEffect, useState } from "react"
import {
  calculateTransitions,
  getStartingSnapshot,
  TokenTransition,
  TokenTransitionsSnapshot,
} from "codehike/utils/token-transitions"
import {
  AnnotationHandler,
  HighlightedCode,
  InnerPre,
  InnerToken,
} from "codehike/code"

export function useTokenTransitions(
  oldCode: HighlightedCode | undefined,
  newCode: HighlightedCode,
  durationInFrames: number
) {
  const frame = useCurrentFrame()
  const ref = React.useRef<HTMLPreElement>(null)
  const [snapshot, setSnapshot] = useState<TokenTransitionsSnapshot>()
  const [handle] = React.useState(() => delayRender())

  // if no old code, we transition from empty code
  const prevCode = oldCode || { ...newCode, tokens: [], annotations: [] }

  useLayoutEffect(() => {
    if (!snapshot) {
      setSnapshot(getStartingSnapshot(ref.current!))
      return
    }
    const transitions = calculateTransitions(ref.current!, snapshot)
    transitions.forEach(({ element, keyframes, options }) => {
      interpolateStyle(
        element,
        keyframes,
        frame,
        durationInFrames * options.delay,
        durationInFrames * options.duration
      )
    })
    continueRender(handle)
  })

  const code = snapshot ? newCode : prevCode

  return { code, ref }
}

export const tokenTransitions: AnnotationHandler = {
  name: "token-transitions",
  Pre: (props) => <InnerPre merge={props} style={{ position: "relative" }} />,
  Token: (props) => (
    <InnerToken merge={props} style={{ display: "inline-block" }} />
  ),
}

function interpolateStyle(
  element: HTMLElement,
  keyframes: TokenTransition["keyframes"],
  frame: number,
  delay: number,
  duration: number
) {
  let { translateX, translateY, color, opacity } = keyframes

  const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  })

  if (opacity) {
    element.style.opacity = interpolate(progress, [0, 1], opacity).toString()
  }
  if (color) {
    element.style.color = interpolateColors(progress, [0, 1], color)
  }
  if (translateX || translateY) {
    const x = interpolate(progress, [0, 1], translateX!)
    const y = interpolate(progress, [0, 1], translateY!)
    element.style.translate = `${x}px ${y}px`
  }
}
