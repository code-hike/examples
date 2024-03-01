import { z } from "zod"
import { Block, Code, parse } from "codehike/schema"

export type Content = ReturnType<typeof parseContent>

// `content` is the object Code Hike generates from the markdown file
export function parseContent(content: unknown) {
  // if there's an error, `parse` will throw with a message specifying the section in the markdown file that caused the error
  return parse(
    content,
    Block.extend({
      intro: Block,
      resource: Block.extend({
        code: Code,
        properties: z.array(Property),
        hidden: z.optional(z.array(Property)),
      }),
      endpoints: z.array(
        Block.extend({
          method: z.enum(["GET", "POST", "PUT", "DEL"]),
          path: z.string(),
          request: z.array(Code),
          response: Code,
          parameters: z.optional(z.array(Property)),
          examples: z.optional(z.array(Example)),
        }),
      ),
    }),
  )
}

const Property = Block.extend({
  type: z.string(),
  readonly: z.optional(z.string()).transform((val) => val != null),
  deprecated: z.optional(z.string()).transform((val) => val != null),
  required: z.optional(z.string()).transform((val) => val != null),
  default: z.optional(z.string()),
  subproperties: z.optional(Block),
})

const Example = Block.extend({
  path: z.optional(z.string()),
  pathParams: z.optional(Code),
  queryParams: z.optional(Code),
  requestBody: z.optional(Code),
})
