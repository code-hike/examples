import { z } from "zod"
import { Block, CodeBlock, parseRoot } from "codehike/blocks"

export type Content = ReturnType<typeof parseContent>

export function parseContent(content: any) {
  // if there's an error, `parse` will throw with a message specifying the section in the markdown file that caused the error
  return parseRoot(
    content,
    Block.extend({
      intro: Block,
      resource: Block.extend({
        code: CodeBlock,
        properties: z.array(Property),
        hidden: z.optional(z.array(Property)),
      }),
      endpoints: z.array(
        Block.extend({
          method: z.enum(["GET", "POST", "PUT", "DEL"]),
          path: z.string(),
          request: z.array(CodeBlock),
          response: CodeBlock,
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
  pathParams: z.optional(CodeBlock),
  queryParams: z.optional(CodeBlock),
  requestBody: z.optional(CodeBlock),
})
