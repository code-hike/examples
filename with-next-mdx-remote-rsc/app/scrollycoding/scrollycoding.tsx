import { z } from "zod"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { highlight, Pre, RawCode } from "codehike/code"

import { tokenTransitions } from "../../components/annotations/token-transitions"
import { wordWrap } from "../../components/annotations/word-wrap"
import styles from "./scrollycoding.module.css"

const Schema = Block.extend({
  steps: z.array(
    Block.extend({
      code: CodeBlock,
    })
  ),
})

export function Scrollycoding(props: unknown) {
  const { steps } = parseProps(props, Schema)
  return (
    <SelectionProvider className={styles.container}>
      <div className={styles.stepsContainer}>
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click", "scroll"]}
            className={styles.step}
          >
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <Selection
        from={steps.map((step) => (
          <CodeSticker codeblock={step.code} />
        ))}
      />
    </SelectionProvider>
  )
}

async function CodeSticker({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <div className={styles.sticker}>
      <div className={styles.stickyCode}>
        <Pre
          code={highlighted}
          handlers={[tokenTransitions, wordWrap]}
          style={{ minHeight: "40rem", backgroundColor: "transparent" }}
        />
      </div>
    </div>
  )
}
