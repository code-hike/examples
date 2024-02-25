import { cn } from "@/lib/utils"

const methodStyle = {
  POST: {
    color: "#00f4b9",
    background: "#1d2b25",
    borderColor: "#00e4ad",
  },
  GET: {
    color: "#b4b1ff",
    background: "#211375",
    borderColor: "#c6c4ff",
  },
  PUT: {
    color: "#e4eb45",
    background: "#35370a",
    borderColor: "#e4eb45",
  },
  DEL: {
    color: "#fd847e",
    background: "#530c02",
    borderColor: "#fa3510",
  },
}

export function Method({
  value,
  className,
}: {
  className?: string
  value: "GET" | "POST" | "PUT" | "DEL"
}) {
  return (
    <div
      className={cn(
        "border rounded border-current text-sm w-[5ch] text-center",
        className,
      )}
      style={methodStyle[value]}
    >
      {value}
    </div>
  )
}

export function Path({
  method,
  path,
}: {
  method: "GET" | "POST" | "PUT" | "DEL"
  path: string
}) {
  const { color } = methodStyle[method]
  return <div style={{ color }}>{path}</div>
}
