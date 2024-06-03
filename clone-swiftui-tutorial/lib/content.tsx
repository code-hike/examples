import { parseRoot, Block, CodeBlock, ImageBlock } from "codehike/blocks"
import { MDXProps } from "mdx/types.js"
import { z } from "zod"

export async function getTutorial(slug: string, props: MDXProps) {
  const { default: Content } = await import(`@/content/${slug}/tutorial.md`)
  return parseRoot(Content, Schema, props)
}

export async function loadImage(
  slug: string,
  img?: { url: string; alt: string },
) {
  if (!img) return null
  const {
    default: { src, height, width },
  } = await import(`@/content/${slug}/assets/${img.url}`)
  return {
    src,
    height,
    width,
    alt: img.alt,
  }
}

const HeroBlock = Block.extend({
  time: z.string(),
  files: z.string(),
  xcode: z.string(),
  image: ImageBlock,
})

const SectionBlock = Block.extend({
  intro: Block.extend({ cover: ImageBlock }),
  Step: z.array(
    Block.extend({
      code: z.optional(CodeBlock),
      screenshot: z.optional(ImageBlock),
      preview: z.optional(ImageBlock),
    }),
  ),
})

const QuizBlock = Block.extend({
  questions: z.array(
    Block.extend({
      answers: z.array(
        Block.extend({
          hint: z.optional(z.string()),
        }),
      ),
    }),
  ),
})
const Schema = Block.extend({
  hero: HeroBlock,
  sections: z.array(SectionBlock),
  quiz: QuizBlock,
})

export type TutorialContent = z.infer<typeof Schema>
export type HeroData = z.infer<typeof HeroBlock>
export type SectionData = z.infer<typeof SectionBlock>
export type QuizData = z.infer<typeof QuizBlock>
