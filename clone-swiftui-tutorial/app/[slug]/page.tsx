import { Steps, ScrollyStep, Step } from "codehike/scrolly"
import { CodeContent, CodeBlock } from "codehike"
import { Nav } from "@/components/nav"

export default async function TutorialPage({
  params,
}: {
  params: { slug: string }
}) {
  const { default: Content } = await import(
    `@/content/${params.slug}/tutorial.mdx`
  )
  return (
    <>
      <Nav />
      <Content components={{ Tutorial }} />
    </>
  )
}

export function Tutorial({ hike }: { hike: any }) {
  const hero = hike.hero[0]
  const sections = hike.sections

  return (
    <main>
      <header className="py-20 bg-black">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h3>SwiftUI essentials</h3>
          <h1>{hero.query}</h1>
          {hero.children}
        </div>
      </header>
      {sections.map((section: any, i: number) => (
        <Section
          key={i}
          header={section.header[0].children}
          steps={section.steps}
        />
      ))}
    </main>
  )
}

function Section({ header, steps }: any) {
  const content = steps.map((step: any) => ({
    sticker: <Code codeblock={step.code[0]} />,
  }))

  return (
    <section className="max-w-3xl mx-auto pt-20">
      <header className="prose mb-20">
        <h3>Section 1</h3>
        <h2>Foo</h2>
        {header}
      </header>
      <Steps className="flex gap-4" steps={content}>
        <ScrollableContent steps={steps} />
        <div className="w-[40vw] max-w-xl bg-zinc-100">
          <div className="top-16 sticky">
            <Step element="sticker" />
          </div>
        </div>
      </Steps>
    </section>
  )
}

function ScrollableContent({ steps }: { steps: any[] }) {
  return (
    <div className="flex-1 mt-32 mb-[90vh] ml-2 ">
      {steps.map((step: any, i: number) => (
        <ScrollyStep
          key={i}
          stepIndex={i}
          className={
            "border-l-8 border-transparent data-[ch-selected]:border-blue-400" +
            " px-5 py-2 mb-24 rounded-lg bg-zinc-50"
          }
        >
          <h2 className="mt-4 text-xl">{step.query}</h2>
          <div>{step.children}</div>
        </ScrollyStep>
      ))}
    </div>
  )
}

function Code({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <CodeContent
      codeblock={codeblock}
      config={{ theme: "github-light" }}
      className="min-h-[40rem]"
    />
  )
}