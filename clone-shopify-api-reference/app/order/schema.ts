import { z } from "zod"
import { Block, Code } from "codehike/schema"

const Property = Block.extend({
  type: z.string(),
  readonly: z.optional(z.string()).transform((val) => val != null),
  deprecated: z.optional(z.string()).transform((val) => val != null),
  required: z.optional(z.string()).transform((val) => val != null),
  default: z.optional(z.string()),
  subproperties: z.optional(Block),
})

const Resource = Block.extend({
  code: Code,
  properties: z.array(Property),
  hidden: z.optional(z.array(Property)),
})

const Example = Block.extend({
  path: z.optional(z.string()),
  pathParams: z.optional(Code),
  queryParams: z.optional(Code),
  requestBody: z.optional(Code),
})

const Endpoint = Block.extend({
  method: z.enum(["GET", "POST", "PUT", "DEL"]),
  path: z.string(),
  request: z.array(Code),
  response: Code,
  parameters: z.optional(z.array(Property)),
  examples: z.optional(z.array(Example)),
})

export const ContentSchema = Block.extend({
  intro: Block,
  resource: Resource,
  endpoints: z.array(Endpoint),
})

export type ContentBlock = z.infer<typeof Block>
export type ResourceBlock = z.infer<typeof Resource>
export type PropertyBlock = z.infer<typeof Property>
export type EndpointBlock = z.infer<typeof Endpoint>

export function parseContent(blocks: any) {
  const result = ContentSchema.safeParse(blocks)
  if (result.success) {
    return result.data
  }

  const error = result.error.errors[0]

  let p = error.path.slice()
  let block = blocks
  let location = ""
  while (p.length) {
    const key = p.shift()!
    block = block[key]
    if (block?._data?.header) {
      location += `\n${block._data.header}`
    }
  }

  const { path, code, message, ...rest } = error
  const name = path[path.length - 1]

  throw new Error(`at ${location || "root"}
Error for \`${name}\`: ${message}
${JSON.stringify(rest, null, 2)}
  `)
}
