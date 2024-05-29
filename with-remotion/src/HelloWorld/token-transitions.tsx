"use client"

import React from "react"
import {
  SnapshotElement,
  animateChange,
  getFirstSnapshot,
} from "./animate-tokens.js"

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
    return getFirstSnapshot(this.ref.current!)
  }

  componentDidUpdate(
    prevProps: any,
    prevState: any,
    firstSnapshot: SnapshotElement[]
  ) {
    animateChange(this.ref.current!, firstSnapshot)
  }

  render() {
    const style = {
      position: "relative" as const,
      ...this.props.style,
    }
    return <pre ref={this.ref} {...this.props} style={style} />
  }
}
