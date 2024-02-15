"use client"

import { useState } from "react"

export function TwoTabs({ one, two }) {
  const [tab, setTab] = useState("left")
  return (
    <div>
      <button
        onClick={() => setTab("left")}
        style={{
          fontWeight: tab === "left" ? "bold" : "normal",
        }}
      >
        Left
      </button>
      {" - "}
      <button
        onClick={() => setTab("right")}
        style={{
          fontWeight: tab === "right" ? "bold" : "normal",
        }}
      >
        Right
      </button>
      <div>{tab === "left" ? one : two}</div>
    </div>
  )
}

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
