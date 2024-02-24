import { CodeBlock, CodeContent } from "codehike"

export function ResourceCode({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <div className="border border-[#1e647a] min-w-0 flex-1 rounded-lg max-w-lg ml-auto bg-[#184C5E]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#133A48] m-0.5 rounded-lg">
        {"{}   " + codeblock.meta}
      </div>
      <CodeContent
        codeblock={codeblock}
        config={{ theme: "dark-plus" }}
        className="min-h-[40rem] max-h-[600px] m-0 whitespace-pre-wrap"
      />
    </div>
  )
}

export function RequestCode({
  codeblocks,
  path,
  method,
}: {
  codeblocks: CodeBlock[]
  method: "GET" | "POST" | "PUT" | "DEL"
  path: string
}) {
  const codeblock = codeblocks[0]
  return (
    <div className="border border-[#1e647a] min-w-0 flex-1 rounded-lg max-w-lg ml-auto bg-[#184C5E]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#133A48] m-0.5 rounded-lg">
        {"{}   " + codeblock.meta}
      </div>
      <CodeContent
        codeblock={codeblock}
        config={{ theme: "dark-plus" }}
        className="min-h-[40rem] max-h-[600px] m-0 whitespace-pre-wrap"
      />
    </div>
  )
}

export function ResponseCode({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <div className="border border-cyan-950 min-w-0 flex-1 rounded-lg max-w-lg ml-auto bg-[#0A1D26]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#061219] m-0.5 rounded-lg flex gap-3 items-center">
        <span>{"{}"}</span>
        <span>{codeblock.meta}</span>
        <span className="ml-auto border rounded border-cyan-950 mt-0.5 text-sm w-[5ch] text-center">
          JSON
        </span>
      </div>
      <CodeContent
        codeblock={codeblock}
        config={{ theme: "dark-plus" }}
        className="max-h-[600px] m-0 whitespace-pre-wrap"
      />
    </div>
  )
}
