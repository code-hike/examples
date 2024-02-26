"use client"

import { Clipboard, ClipboardCheck } from "lucide-react"
import * as React from "react"

export function CopyButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      className={`p-1 rounded ${className}`}
      onClick={() => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      }}
      aria-label="Copy to clipboard"
    >
      {copied ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
    </button>
  )
}
