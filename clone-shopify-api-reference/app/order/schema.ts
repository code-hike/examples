import { z } from "zod"

const Block = z.object({
  query: z.string(),
  children: z.array(z.custom<React.ReactNode>()),
})

const Code = z.object({
  meta: z.string().optional(),
  value: z.string(),
  lang: z.string(),
})

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

const Endpoint = Block.extend({
  method: z.enum(["GET", "POST", "PUT", "DEL"]),
  path: z.string(),
  parameters: z.optional(z.array(Property)),
  response: Code,
  // response: z.optional(Block),
  // examples: z.array(Block),
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

  throw result.error

  // TODO better error message

  //   const error = result.error.errors[0]
  //   console.log("result", error)

  //   let p = error.path.slice()
  //   let block = blocks
  //   let location = ""
  //   while (p.length) {
  //     const key = p.shift()!
  //     // is a number
  //     if (typeof key === "number") {
  //       block = block[key]
  //       location += `[${key}]`
  //     } else {
  //       block = block[key]
  //       location += `\n${key}`
  //     }
  //     if (block && block.query) {
  //       location += ` ${block.query}`
  //     }
  //   }

  //   const s = `at content.md
  // ## !resource The Order resource
  // ### !!properties billing_address
  // !type is missing
  //   `

  //   throw new Error(s, {
  //     cause: "foo",
  //   })
}
