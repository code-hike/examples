import { Pre, HighlightedCode } from "codehike/code"
import React from "react"

import { callout } from "./annotations/callout"

import { loadFont } from "@remotion/google-fonts/RobotoMono"
import { tokenTransitions, useTokenTransitions } from "./token-transitions"
import { error } from "./annotations/error"
const { fontFamily } = loadFont()

export function Code({
  oldCode,
  newCode,
  durationInFrames = 30,
}: {
  oldCode?: HighlightedCode
  newCode: HighlightedCode
  durationInFrames?: number
}) {
  const { code, ref } = useTokenTransitions(oldCode, newCode, durationInFrames)
  return (
    <Pre
      ref={ref}
      code={code}
      handlers={[tokenTransitions, callout, ...error]}
      style={{ fontSize: 20, lineHeight: 1.5, fontFamily }}
    />
  )
}
