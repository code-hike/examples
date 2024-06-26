import { AbsoluteFill, Composition, Sequence } from "remotion"
import React from "react"
import { ProgressBar } from "./progress-bar"
import { Code, Output } from "./code"
import { calculateMetadata } from "./calculate-metadata"

export default function RemotionRoot() {
  return (
    <Composition
      id="pomber"
      component={Video}
      fps={60}
      width={1280}
      height={720}
      calculateMetadata={calculateMetadata}
    />
  )
}

function Video({ steps }) {
  let stepEnd = 0
  return (
    <AbsoluteFill
      style={{
        background: "#010409",
      }}
    >
      {/* <ProgressBar steps={steps} /> */}
      <Captions steps={steps} />
      {steps.map((step, index) => {
        stepEnd += step.duration
        return (
          <Sequence
            key={index}
            from={stepEnd - step.duration}
            durationInFrames={step.duration}
            name={step.title}
            style={{
              padding: 16,
              display: "flex",
              gap: 16,
              height: 610,
              justifyContent: "center",
            }}
          >
            <Code
              oldCode={steps[index - 1]?.code}
              newCode={step.code}
              style={{ width: 760, height: "100%" }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Code
                oldCode={steps[index - 1]?.content}
                newCode={step.content}
                style={{ width: 420, height: 300 }}
              />
              <Output
                newCode={step.output}
                oldCode={steps[index - 1]?.output}
              />
            </div>
          </Sequence>
        )
      })}
    </AbsoluteFill>
  )
}

function Captions({ steps }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 110,
        display: "flex",
        gap: 6,
        padding: "20px 18px",
        color: "#fafafabb",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 42,
        fontFamily: "Arial, sans-serif",
      }}
    ></div>
  )
}
