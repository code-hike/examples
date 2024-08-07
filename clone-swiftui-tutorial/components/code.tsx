import {
  AnnotationHandler,
  InnerLine,
  Pre,
  RawCode,
  highlight,
} from "codehike/code"
import { FileIcon } from "./file-icon"
import theme from "./theme"

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, theme)

  return (
    <>
      <div className="pl-4 pt-3 text-zinc-600 bg-zinc-50">
        <FileIcon filename={codeblock.meta} />
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
  Line: ({ annotation, ...props }) => {
    const className = annotation
      ? "flex bg-indigo-50 border-l-4 border-blue-400"
      : "flex border-l-4 border-transparent"
    return (
      <div className={className}>
        <InnerLine merge={props} className="px-2 flex-1" />
      </div>
    )
  },
}

const lineNumber: AnnotationHandler = {
  name: "LineNumber",
  Line: ({ annotation, ...props }) => {
    const width = props.totalLines.toString().length + 1
    return (
      <>
        <span
          style={{ minWidth: `${width}ch` }}
          className="text-right opacity-50 select-none mx-1"
        >
          {props.lineNumber}
        </span>
        <InnerLine merge={props} />
      </>
    )
  },
}
