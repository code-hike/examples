"use client"

import { ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Preview({ preview }: any) {
  const [open, setOpen] = useState(true)
  const disabled = !preview
  const collapsed = disabled || !open
  return (
    <div
      data-state={collapsed ? "closed" : "open"}
      className={cn(
        "hidden md:block absolute m-4 top-0 right-0 rounded-2xl bg-zinc-100 overflow-hidden",
        "w-28 data-[state=open]:w-72 transition-[width]",
        disabled ? "" : "shadow-[0_0_3px_0] shadow-black/40",
      )}
    >
      <button
        className="px-3 py-2 text-xs font-semibold text-zinc-600 flex justify-between w-full items-center disabled:opacity-50"
        onClick={() => setOpen(!open)}
        disabled={disabled}
      >
        {disabled ? <span>No Preview</span> : <span>Preview</span>}
        {collapsed ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
      </button>
      <div className="bg-white [[data-state=closed]_&]:hidden">
        <img src={preview?.src} alt={preview?.alt} />
      </div>
    </div>
  )
}
