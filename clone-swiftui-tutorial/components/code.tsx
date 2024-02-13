import { CodeContent, CodeBlock } from "codehike"
import { themeIcons } from "seti-icons"

export function Code({ codeblock }: { codeblock: CodeBlock }) {
  const { svg, color } = getLightIcon(codeblock.meta || "")
  const __html = svg.replace(/svg/, `svg fill='${color}'`)

  return (
    <div className="">
      <div className="pl-4 pt-3 text-zinc-600">
        <span
          dangerouslySetInnerHTML={{ __html }}
          style={{
            display: "inline-block",
            height: "1.8em",
            width: "1.8em",
            margin: "-0.6em 0",
            marginRight: "0.5em",
          }}
        />
        {codeblock.meta}
      </div>
      <CodeContent
        key={codeblock.meta}
        codeblock={codeblock}
        config={{ theme: "github-light", annotationPrefix: "!" }}
        className="min-h-[40rem] py-3 pl-1"
        components={{ Line, Mark }}
      />
    </div>
  )
}

function Line({ children, query }: any) {
  return (
    <div data-line="true" className="px-2">
      <span className="pl-2 pr-4 inline-block w-[2ch] box-content !opacity-50 text-right select-none">
        {query}
      </span>
      {children}
    </div>
  )
}

function Mark({ query, inline, children }: any) {
  return (
    <div className={"bg-indigo-50 shadow-[-4px_0_0] shadow-blue-400"}>
      {children}
    </div>
  )
}

const getDarkIcon = themeIcons({
  blue: "#519aba",
  grey: "#4d5a5e",
  "grey-light": "#6d8086",
  green: "#8dc149",
  orange: "#e37933",
  pink: "#f55385",
  purple: "#a074c4",
  red: "#cc3e44",
  white: "#d4d7d6",
  yellow: "#cbcb41",
  ignore: "#41535b",
})

const getLightIcon = themeIcons({
  blue: "#498ba7",
  grey: "#455155",
  "grey-light": "#627379",
  green: "#7fae42",
  orange: "#f05138",
  pink: "#dd4b78",
  purple: "#9068b0",
  red: "#b8383d",
  white: "#bfc2c1",
  yellow: "#b7b73b",
  ignore: "#3b4b52",
})
