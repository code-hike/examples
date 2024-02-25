import { cn } from "@/lib/utils"

export function Pill({
  value,
  bg,
  fg,
  className,
}: {
  value: string | undefined
  bg?: string
  fg?: string
  className?: string
}) {
  if (!value) return null
  return (
    <span
      className={cn("px-1 rounded text-sm", className)}
      style={{ backgroundColor: bg, color: fg }}
    >
      {value}
    </span>
  )
}
