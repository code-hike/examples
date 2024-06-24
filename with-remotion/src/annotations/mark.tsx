import React from "react"
import { interpolate, interpolateColors, useCurrentFrame } from "remotion"
import { AnnotationHandler } from "codehike/code"

export const mark: AnnotationHandler = {
  name: "mark",
  Block: ({ children, annotation }) => {
    const delay = +(annotation.query || 0)
    const frame = useCurrentFrame()

    const progress = interpolate(frame, [delay, delay + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
    const backgroundColor = interpolateColors(
      progress,
      [0, 1],
      ["rgba(0, 0, 0, 0)", "blue"]
    )

    return <div style={{ backgroundColor, width: "100%" }}>{children}</div>
  },
}
