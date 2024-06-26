import { Pre, HighlightedCode, InnerLine } from "codehike/code"
import React from "react"

import { loadFont } from "@remotion/google-fonts/RobotoMono"
import { tokenTransitions, useTokenTransitions } from "./token-transitions"
import { mark } from "./annotations/mark"
import {
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"
const { fontFamily } = loadFont()

const FOCUS_FRAMES = 15

export function Code({
  oldCode,
  newCode,
  durationInFrames = 30,
  style,
}: {
  oldCode?: HighlightedCode & { focus?: boolean }
  newCode: HighlightedCode & { focus?: boolean }
  durationInFrames?: number
  style?: React.CSSProperties
}) {
  const { code, ref } = useTokenTransitions(oldCode, newCode, 120, 30)

  const { borderColor, opacity } = useFocus(oldCode, newCode)

  return (
    <div
      style={{
        fontSize: code.meta == "code.jsx" ? 23 : 21,
        lineHeight: 1.4,
        fontFamily,
        color: "white",
        padding: "0 12px",
        border: "2px solid",
        borderColor,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#0D1117",
        ...style,
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "8px 0 12px",
          opacity,
          fontSize: 20,
        }}
      >
        {newCode.meta}
      </div>
      <Pre
        ref={ref}
        code={code}
        handlers={[tokenTransitions, mark]}
        style={{ margin: "0 0 6px" }}
      />
    </div>
  )
}

function useFocus(oldCode, newCode) {
  const frame = useCurrentFrame()
  const focusColor = "#58a6ffaa"
  let borderColor = "transparent"
  let opacity = 0.6
  if (oldCode?.focus && newCode.focus) {
    borderColor = focusColor
    opacity = 1
  } else if (oldCode?.focus) {
    borderColor = interpolateColors(
      frame,
      [0, FOCUS_FRAMES],
      [focusColor, "transparent"]
    )
    opacity = interpolate(frame, [0, FOCUS_FRAMES], [1, 0.6], {
      extrapolateRight: "clamp",
    })
  } else if (newCode?.focus) {
    borderColor = interpolateColors(
      frame,
      [0, FOCUS_FRAMES],
      ["transparent", focusColor]
    )
    opacity = interpolate(frame, [0, FOCUS_FRAMES], [0.6, 1], {
      extrapolateRight: "clamp",
    })
  }
  return { borderColor, opacity }
}

export function Output({ newCode, oldCode }) {
  const { borderColor, opacity } = useFocus(oldCode, newCode)
  let codeOpacity = newCode ? 1 : 0
  const frame = useCurrentFrame()
  if (!oldCode && newCode) {
    codeOpacity = interpolate(
      frame,
      [FOCUS_FRAMES * 2, FOCUS_FRAMES * 4],
      [0, 1],
      {
        extrapolateRight: "clamp",
      }
    )
  }
  return (
    <div
      style={{
        background: "#e6edff25",
        flex: 1,
        backgroundImage: `url(${staticFile("dark-grid.svg")})`,
        backgroundPosition: "center",
        backgroundSize: "46px",
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: 20,
        fontFamily,
        lineHeight: 1.5,
        color: "white",
        border: "2px solid",
        borderColor,
      }}
    >
      <div style={{ textAlign: "center", padding: "8px 0 0", opacity }}>
        output
      </div>
      {newCode ? (
        <Pre
          code={newCode}
          style={{
            backgroundColor: "#0D1117",
            height: 180,
            width: 412,
            borderRadius: 4,
            margin: 12,
            padding: "12px 0",
            opacity: codeOpacity,
          }}
          handlers={[markHandler]}
        />
      ) : (
        <div
          style={{
            padding: "12px 0",
            backgroundColor: "#0D1117",
            height: 180,
            width: 412,
            borderRadius: 4,
            margin: 12,
            opacity: 0,
          }}
        ></div>
      )}
    </div>
  )
}
const markHandler = {
  name: "mark",
  Line: (props) => <InnerLine merge={props} style={{ padding: "0 12px" }} />,
  Block: ({ children, annotation }) => {
    const fadein = annotation.query === "fadein"
    const frame = useCurrentFrame()
    const targetColor = "#58a6ff44"
    const background = fadein
      ? interpolateColors(
          frame,
          [FOCUS_FRAMES * 2, FOCUS_FRAMES * 3],
          ["transparent", targetColor]
        )
      : targetColor
    return <div style={{ background }}>{children}</div>
  },
}
