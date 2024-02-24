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
  readonly: z.coerce.boolean(),
  deprecated: z.coerce.boolean(),
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
  // parameters: z.array(Property),
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
