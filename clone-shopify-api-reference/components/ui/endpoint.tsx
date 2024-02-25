import { cn } from "@/lib/utils"

const methodColor = {
  POST: "text-teal-300",
  GET: "text-indigo-300",
  PUT: "text-yellow-200",
  DEL: "text-red-400",
}

export function Method({ value }: { value: "GET" | "POST" | "PUT" | "DEL" }) {
  return (
    <div
      className={cn(
        "border rounded border-current mt-0.5 text-sm w-[5ch] text-center",
        methodColor[value],
      )}
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
  return <div className={cn(methodColor[method])}>{path}</div>
}
