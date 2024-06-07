"use client"

import React from "react"
import {
  TokenTransitionsSnapshot,
  calculateTransitions,
  getStartingSnapshot,
} from "./code/animate-tokens.js"

export class CodeTransitions extends React.Component<{
  InnerPre: any
  style?: React.CSSProperties
}> {
  ref: React.RefObject<HTMLPreElement>

  constructor(props: any) {
    super(props)
    this.ref = React.createRef<HTMLPreElement>()
  }

  getSnapshotBeforeUpdate() {
    return getStartingSnapshot(this.ref.current!)
  }

  componentDidUpdate(
    prevProps: any,
    prevState: any,
    startingSnapshot: TokenTransitionsSnapshot
  ) {
    const transitions = calculateTransitions(
      this.ref.current!,
      startingSnapshot,
      {
        selector: "span",
      }
    )
    transitions.forEach(({ element, keyframes, options }) => {
      const { opacity, color, translateX, translateY } = keyframes
      element.animate(
        {
          color,
          opacity,
          translate: translateX &&
            translateY && [
              `translate(${translateX[0]}px, ${translateY[0]}px)`,
              `translate(${translateX[1]}px, ${translateY[1]}px)`,
            ],
        },
        {
          duration: options.duration,
          easing: options.easing,
          fill: "both",
          delay: options.delay,
        }
      )
    })
  }

  render() {
    const style = {
      position: "relative" as const,
      ...this.props.style,
    }
    return <pre ref={this.ref} {...this.props} style={style} />
  }
}
