import {
  InlineAnnotation,
  AnnotationHandler,
  InnerLine,
  InnerToken,
} from "codehike/code"
import React from "react"
import { interpolate, useCurrentFrame } from "remotion"

const errorInline: AnnotationHandler = {
  name: "error",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return [
      annotation,
      {
        name: "error-message",
        query,
        fromLineNumber: lineNumber,
        toLineNumber: lineNumber,
        data,
      },
    ]
  },
  Inline: ({ children }) => (
    <span
      style={
        {
          "--decoration": "underline wavy red",
        } as any
      }
    >
      {children}
    </span>
  ),
  Token: (props) => {
    return (
      <InnerToken
        merge={props}
        style={{
          textDecoration: "var(--decoration)",
        }}
      />
    )
  },
}

const errorMessage: AnnotationHandler = {
  name: "error-message",
  Block: ({ annotation, children }) => {
    const frame = useCurrentFrame()
    const opacity = interpolate(frame, [25, 35], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })

    return (
      <>
        {children}
        <div
          style={{
            opacity,
            borderLeft: "2px solid red",
            marginLeft: "-0.5rem",
            backgroundColor: "rgb(32 42 57)",
            padding: "0.5rem 1rem",
            marginTop: "0.25rem",
            whiteSpace: "pre-wrap",
            color: "#c9d1d9",
          }}
        >
          {annotation.data.children || annotation.query}
        </div>
      </>
    )
  },
}

export const error = [errorInline, errorMessage]
