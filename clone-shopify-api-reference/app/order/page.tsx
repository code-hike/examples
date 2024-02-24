// @ts-ignore
import { getBlocks } from "./content.md"
import { CodeContent, CodeBlock } from "codehike"
import {
  ContentBlock,
  ContentSchema,
  EndpointBlock,
  PropertyBlock,
  ResourceBlock,
} from "./schema"

const content = ContentSchema.parse(getBlocks())

export const metadata = {
  title: content.intro.query,
}

export default function Page() {
  const { intro, resource, endpoints } = content
  return (
    <main className="prose prose-invert prose-hr:border-[#133a48] max-w-6xl mx-auto">
      <Intro {...intro} endpoints={endpoints} />
      <Resource {...resource} />
      {endpoints.map((endpoint) => (
        <Endpoint {...endpoint} key={endpoint.query} />
      ))}
    </main>
  )
}

const methodColor = {
  POST: "text-teal-300",
  GET: "text-indigo-300",
  PUT: "text-yellow-200",
  DEL: "text-red-400",
}

function Intro({
  query,
  children,
  endpoints,
}: ContentBlock & { endpoints: EndpointBlock[] }) {
  return (
    <section className="mt-24 flex gap-8">
      <div className="min-w-0 flex-1">
        <h1>{query}</h1>
        {children}
      </div>
      <div className="min-w-0 flex-1">
        <div className="border border-cyan-950 min-w-0 flex-1 rounded-lg max-w-lg ml-auto bg-[#0A1D26]">
          <div className="font-mono px-4 py-1 text-[#bedbeb] bg-[#061219] m-0.5 rounded-lg">
            # Endpoints
          </div>
          <div className="p-4">
            {endpoints.map((endpoint) => (
              <a
                key={endpoint.query}
                href={`#${endpoint.query.replace(/\s/g, "-")}`}
                className={`flex gap-3 no-underline items-start mb-1 ${
                  methodColor[endpoint.method]
                } p-2 rounded-lg`}
              >
                <div className="border rounded border-current mt-0.5 text-sm w-[5ch] text-center">
                  {endpoint.method}
                </div>
                <div className="">
                  <div>{endpoint.path}</div>
                  <div className="text-[#81aec4]"># {endpoint.query}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Resource({ query, code, properties, hidden }: ResourceBlock) {
  return (
    <section className="">
      <hr className="my-16" />
      <div className="flex gap-8 ">
        <div className="min-w-0 flex-1 prose-hr:my-2">
          <h2 className="mt-0">{query}</h2>
          <div>Properties</div>
          <hr />
          {properties.map((property) => (
            <Property key={property.query} {...property} />
          ))}

          {hidden && (
            <details className="">
              <summary className="my-3 text-zinc-400 cursor-pointer">
                {hidden.length} hidden fields
              </summary>
              {hidden.map((property) => (
                <Property key={property.query} {...property} />
              ))}
            </details>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="sticky top-4">
            <Code codeblock={code} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Property({
  query,
  type,
  readonly,
  deprecated,
  children,
  subproperties,
}: PropertyBlock) {
  return (
    <div>
      <div className="flex gap-2 font-mono">
        <span className="text-blue-300">{query}</span>
        <span className="text-cyan-300">{type}</span>
        <span>{readonly ? "readonly" : "not readonly"}</span>
        <span>{deprecated ? "deprecated" : "not deprecated"}</span>
      </div>
      {children}

      {subproperties && (
        <details className="border border-zinc-800 bg-zinc-900 rounded-lg">
          <summary className="p-2 border-b border-zinc-800 text-zinc-400 cursor-pointer">
            <span className="font-mono">{query}</span> properties
          </summary>
          <div className="px-4">{subproperties.children}</div>
        </details>
      )}
      <hr />
    </div>
  )
}

function Endpoint({ query, method, path, children }: EndpointBlock) {
  return (
    <section className="mt-12">
      <hr className="my-16" />
      <div className="flex gap-8">
        <div className="min-w-0 flex-1">
          <h2
            id={query.replace(/\s/g, "-")}
            className="flex items-center gap-3 mt-0"
          >
            <div
              className={`border rounded border-current mt-0.5 text-sm w-[5ch] text-center ${methodColor[method]}`}
            >
              {method}
            </div>
            {query}
          </h2>
          <hr className="m-0" />

          <div>{children}</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="sticky top-4">
            <Code codeblock={{ value: "", lang: "json", meta: path }} />
          </div>
        </div>
      </div>
    </section>
  )
}
function Code({ codeblock }: { codeblock: CodeBlock }) {
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
