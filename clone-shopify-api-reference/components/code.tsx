import { CopyButton } from "./copy-button"
import {
  LocalStoredTabs,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"
import { Method, Path } from "./ui/endpoint"
import {
  AnnotationHandler,
  highlight,
  InnerLine,
  Pre,
  RawCode,
} from "codehike/code"

export async function ResourceCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "dark-plus")
  return (
    <div className="border border-[#1e647a] min-w-0 flex-1 rounded-lg lg:max-w-lg lg:ml-auto overflow-hidden bg-[#184C5E]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#133A48] m-0.5 rounded-lg">
        {"{}   " + codeblock.meta}
      </div>
      <Pre
        code={highlighted}
        className="min-h-[40rem] max-h-[600px] m-0 px-0 whitespace-pre-wrap"
        handlers={[line]}
      />
    </div>
  )
}

export async function RequestCode({
  codeblocks,
  path,
  method,
}: {
  codeblocks: RawCode[]
  method: "GET" | "POST" | "PUT" | "DEL"
  path: string
}) {
  const highlighted = await Promise.all(
    codeblocks.map((codeblock) => highlight(codeblock, "dark-plus")),
  )
  return (
    <LocalStoredTabs
      localStorageKey="preferredLanguage"
      defaultValue="Node.js"
      className="border border-[#1e647a] min-w-0 flex-1 rounded-lg lg:max-w-lg lg:ml-auto overflow-hidden mb-4 bg-[#184C5E]"
    >
      <div className="font-mono px-3 text-[#8fbfd7] bg-[#133A48] m-0.5 rounded flex items-center gap-3">
        <Method value={method} />
        <Path method={method} path={path} />
      </div>
      <div className="font-mono py-1 text-[#8fbfd7] mx-0.5 flex gap-1">
        <TabsList className="px-4 bg-[#133A48] rounded flex-1 flex gap-4">
          {codeblocks.map(({ meta }) => (
            <TabsTrigger
              value={meta!}
              className="data-[state=active]:text-white data-[state=active]:border-b border-white"
            >
              {meta}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="px-1 bg-[#133A48] rounded flex items-center hover:bg-[#257a95] transition-colors hover:text-white">
          {codeblocks.map((codeblock) => (
            <TabsContent value={codeblock.meta!} asChild>
              <CopyButton text={codeblock.value} />
            </TabsContent>
          ))}
        </div>
      </div>
      {highlighted.map((codeblock) => (
        <TabsContent value={codeblock.meta!}>
          <Pre
            code={codeblock}
            className="max-h-[600px] m-0 px-0 whitespace-pre-wrap break-all"
            handlers={[line]}
          />
        </TabsContent>
      ))}
    </LocalStoredTabs>
  )
}

export async function ResponseCode({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "dark-plus")
  return (
    <div className="border border-cyan-950 min-w-0 flex-1 rounded-lg lg:max-w-lg lg:ml-auto overflow-hidden bg-[#0A1D26]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#061219] m-0.5 rounded-lg flex gap-3 items-center">
        <span>{"{}"}</span>
        <span>{codeblock.meta}</span>
        <span className="ml-auto border rounded border-cyan-950 mt-0.5 text-sm w-[5ch] text-center">
          JSON
        </span>
      </div>

      <Pre
        code={highlighted}
        className="max-h-[600px] m-0 px-0 whitespace-pre-wrap"
        handlers={[line]}
      />
    </div>
  )
}

const line: AnnotationHandler = {
  name: "line",
  Line: (props) => (
    <div data-line="true" className="table-row px-1">
      <div className="pl-1 pr-4 w-[3ch] box-content !opacity-50 text-right select-none table-cell">
        {props.lineNumber}
      </div>
      <InnerLine merge={props} />
    </div>
  ),
}
