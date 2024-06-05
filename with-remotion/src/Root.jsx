import { Composition } from "remotion"
import { HelloWorld } from "./HelloWorld"
import { Block, HighlightedCodeBlock, parseRoot } from "codehike/blocks"
import { z } from "zod"

const Schema = Block.extend({
  blocks: z.array(Block.extend({ code: HighlightedCodeBlock })),
})

import Content from "./content.md"
const { blocks } = parseRoot(Content, Schema)
const defaultStepDuration = 75

export const RemotionRoot = () => {
  return (
    <Composition
      id="CodeHikeExample"
      component={HelloWorld}
      defaultProps={{ blocks }}
      fps={30}
      durationInFrames={defaultStepDuration * blocks.length}
      width={600}
      height={700}
    />
  )
}
