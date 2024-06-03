import { AnnotationHandler, Pre, RawCode, highlight } from "codehike/code"
import { themeIcons } from "seti-icons"
import theme from "./theme"

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const { svg, color } = getLightIcon(codeblock.meta || "")
  const __html = svg.replace(/svg/, `svg fill='${color}'`)

  const highlighted = await highlight(codeblock, theme)

  return (
    <>
      <div className="pl-4 pt-3 text-zinc-600 bg-zinc-50">
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
      <Pre
        key={codeblock.meta}
        code={highlighted}
        className="md:min-h-[40rem] py-3 pl-1 text-sm bg-zinc-50"
        handlers={[mark, lineNumber]}
      />
    </>
  )
}

export async function ProseCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, theme)

  return <Pre code={highlighted} className="text-sm bg-transparent" />
}

const mark: AnnotationHandler = {
  name: "Mark",
  Block: ({ children }) => (
    <div className="bg-indigo-50 shadow-[-4px_0_0] shadow-blue-400">
      {children}
    </div>
  ),
}

const lineNumber: AnnotationHandler = {
  name: "LineNumber",
  Line: ({ annotation, icon, InnerLine, lineNumber, children, ...props }) => {
    return (
      <InnerLine merge={props} data-line="true" className="px-2">
        <span className="pl-2 pr-4 inline-block w-[2ch] box-content !opacity-50 text-right select-none">
          {lineNumber}
        </span>
        {children}
      </InnerLine>
    )
  },
}

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
