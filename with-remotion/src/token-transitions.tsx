"use client"

import React from "react"
import {
  TokenTransitionsSnapshot,
  calculateTransitions,
  getStartingSnapshot,
} from "./code/token-transitions.js"
import { Pre } from "codehike/code"

type PreProps = React.ComponentProps<typeof Pre>

const MAX_TRANSITION_DURATION = 900 // milliseconds

export class CodeTransitions extends React.Component<PreProps> {
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
    snapshot: TokenTransitionsSnapshot
  ) {
    const transitions = calculateTransitions(this.ref.current!, snapshot)
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
          duration: options.duration * MAX_TRANSITION_DURATION,
          delay: options.delay * MAX_TRANSITION_DURATION,
          easing: options.easing,
          fill: "both",
        }
      )
    })
  }

  render() {
    const style = {
      position: "relative" as const,
      ...this.props.style,
    }
    return <Pre ref={this.ref} {...this.props} style={style} />
  }
}
