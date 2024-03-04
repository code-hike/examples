import { z } from "zod"
import { Block, Code, Image, parse } from "codehike/schema"

export type Content = ReturnType<typeof parseContent>

export function parseContent(content: unknown) {
  return parse(
    content,
    Block.extend({
      hero: Block.extend({
        time: z.string(),
        files: z.string(),
        xcode: z.string(),
      }),
      sections: z.array(
        Block.extend({
          intro: Block.extend({ cover: Image }),
          blocks: z.array(
            Block.extend({
              code: z.optional(Code),
              screenshot: z.optional(Image),
              preview: z.optional(Image),
            }),
          ),
        }),
      ),
      quiz: Block.extend({
        questions: z.array(
          Block.extend({
            answers: z.array(
              Block.extend({
                hint: z.optional(z.string()),
              }),
            ),
          }),
        ),
      }),
    }),
  )
}
