import { InlineAnnotation, AnnotationHandler } from "codehike/code"

export const callout: AnnotationHandler = {
  name: "callout",
  transform: (annotation: InlineAnnotation) => {
    const { name, query, lineNumber, fromColumn, toColumn, data } = annotation
    return {
      name,
      query,
      fromLineNumber: lineNumber,
      toLineNumber: lineNumber,
      data: { ...data, column: (fromColumn + toColumn) / 2 },
    }
  },
  Block: ({ annotation, children }) => {
    const { column } = annotation.data
    return (
      <>
        {children}
        <div
          style={{
            minWidth: `${column + 4}ch`,
            width: "fit-content",
            border: "1px solid currentColor",
            borderRadius: "0.25rem",
            backgroundColor: "#222",
            padding: "0 0.5rem",
            position: "relative",
            marginLeft: "-1ch",
            marginTop: "0.25rem",
            whiteSpace: "break-spaces",
          }}
        >
          <div
            style={{
              left: `${column}ch`,
              position: "absolute",
              borderLeft: "1px solid currentColor",
              borderTop: "1px solid currentColor",
              width: "0.5rem",
              height: "0.5rem",
              transform: "rotate(45deg) translate(-50%, -50%)",
              backgroundColor: "#222",
              top: "1px",
            }}
          />
          {annotation.query}
        </div>
      </>
    )
  },
}
