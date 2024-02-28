// @ts-ignore
import { getBlocks } from "@/content/order.md"
import {
  ContentBlock,
  EndpointBlock,
  PropertyBlock,
  ResourceBlock,
  parseContent,
} from "./schema"
import { Pill } from "@/components/ui/pill"
import { ResourceCode, RequestCode, ResponseCode } from "@/components/code"
import { Method, Path } from "@/components/ui/endpoint"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const content = parseContent(getBlocks())

export const metadata = {
  title: content.intro.query,
}

export default function Page() {
  const { intro, resource, endpoints } = content
  return (
    <>
      <nav className="border-b border-[#133a48] py-2 text-[#bedbeb] flex gap-4 max-w-6xl mx-auto px-10 items-center">
        <Link href="/" className="hover:text-white font-bold">
          Shopiclone
        </Link>
        <a
          href="https://shopify.dev/docs/api/admin-rest/2024-01/resources/order"
          className="hover:text-white"
        >
          Original
        </a>
        <a
          href="https://github.com/code-hike/examples/tree/main/clone-shopify-api-reference"
          className="hover:text-white ml-auto"
        >
          GitHub
        </a>
      </nav>
      <main className="prose prose-invert prose-hr:border-[#133a48] max-w-6xl mx-auto px-10">
        <Intro {...intro} endpoints={endpoints} />
        <Resource {...resource} />
        {endpoints.map((endpoint) => (
          <Endpoint {...endpoint} key={endpoint.query} />
        ))}
      </main>
      <footer className="h-32 bg-zinc-900 mt-12" />
    </>
  )
}

function Intro({
  query,
  children,
  endpoints,
}: ContentBlock & { endpoints: EndpointBlock[] }) {
  return (
    <section className="mt-24 flex gap-8 flex-wrap">
      <div className="min-w-96 flex-1">
        <h1>{query}</h1>
        {children}
      </div>
      <div className="min-w-96 flex-1">
        <EndpointsNav endpoints={endpoints} />
      </div>
    </section>
  )
}

function EndpointsNav({ endpoints }: { endpoints: EndpointBlock[] }) {
  return (
    <div className="border border-cyan-950 min-w-0 flex-1 rounded-lg lg:max-w-lg lg:ml-auto overflow-hidden bg-[#0A1D26]">
      <div className="font-mono px-4 py-1 text-[#bedbeb] bg-[#061219] m-0.5 rounded-lg">
        # Endpoints
      </div>
      <div className="p-4">
        {endpoints.map((endpoint) => (
          <a
            key={endpoint.query}
            href={`#${endpoint.query.replace(/\s/g, "-")}`}
            className={`flex gap-3 no-underline items-start mb-1 p-2 rounded-lg`}
          >
            <Method value={endpoint.method} className="mt-0.5" />
            <div className="">
              <Path method={endpoint.method} path={endpoint.path} />
              <div className="text-[#81aec4]"># {endpoint.query}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function Resource({ query, code, properties, hidden }: ResourceBlock) {
  return (
    <section className="">
      <hr className="my-16" />
      <div className="flex gap-8 flex-wrap">
        <div className="min-w-96 flex-1 prose-hr:my-2">
          <h2 className="mt-0">{query}</h2>
          <div className="font-bold text-lg">Properties</div>
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
        <div className="min-w-96 flex-1">
          <div className="sticky top-4">
            <ResourceCode codeblock={code} />
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
  required,
  default: defaultValue,
  children,
  subproperties,
}: PropertyBlock) {
  return (
    <div>
      <div className="flex gap-2 font-mono items-center">
        <span className="text-[#25a2c6] bg-[#0a1d26] px-1 rounded">
          {query}
        </span>
        <TypeTag value={type} />
        <Pill
          value={readonly ? "read-only" : undefined}
          bg="#151d1e"
          fg="#8a8f93"
        />
        <Pill
          value={deprecated ? "deprecated" : undefined}
          bg="#180f01"
          fg="#d69e27"
        />
        <Pill
          value={required ? "required" : undefined}
          bg="#290400"
          fg="#fd6257"
        />
        <Pill
          value={defaultValue ? `default ${defaultValue}` : undefined}
          bg="#151d1e"
          fg="#8a8f93"
        />
      </div>
      {children}

      {subproperties && (
        <details className="border border-[#133a48] bg-[#0A1D26] rounded-lg overflow-hidden">
          <summary className="p-2  text-[#81AEC4] cursor-pointer">
            <span className="font-mono">{query}</span> properties
          </summary>
          <div className="px-4 border-t border-[#133a48]">
            {subproperties.children}
          </div>
        </details>
      )}
      <hr />
    </div>
  )
}

function TypeTag({ value }: { value: string }) {
  const [type, ...rest] = value.split(" ")
  return (
    <>
      <Pill value={type} fg="#00a6b3" bg="#091f21" />
      <Pill value={rest.join(" ")} fg="#8A8F93" />
    </>
  )
}

function Endpoint({
  query,
  method,
  path,
  request,
  response,
  children,
  parameters = [],
  examples = [],
}: EndpointBlock) {
  return (
    <section className="mt-12">
      <hr className="my-16" />
      <div className="flex gap-8 flex-wrap">
        <div className="min-w-96 flex-1 prose-hr:my-2">
          <h2
            id={query.replace(/\s/g, "-")}
            className="flex items-center gap-3 mt-0 scroll-mt-12"
          >
            <Method value={method} />
            {query}
          </h2>
          <hr className="m-0" />

          <div>{children}</div>
          <div className="font-bold mt-12 text-lg">Parameters</div>
          <hr />
          {parameters.map((property) => (
            <Property key={property.query} {...property} />
          ))}
          <div className="font-bold mt-12 text-lg">Examples</div>
          <hr />
          <Accordion type="single" collapsible className="w-full">
            {examples.map((example) => (
              <AccordionItem key={example.query} value={example.query}>
                <AccordionTrigger className="text-base text-[#81aec4] hover:text-[#bedbeb] data-[state=open]:text-[#bedbeb]">
                  {example.query}
                </AccordionTrigger>
                <AccordionContent>Hey</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="min-w-96 flex-1">
          <div className="sticky top-4">
            <RequestCode codeblocks={request} method={method} path={path} />
            <ResponseCode codeblock={response} />
          </div>
        </div>
      </div>
    </section>
  )
}
