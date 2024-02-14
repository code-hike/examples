import { Steps, ScrollyStep, Step } from "codehike/scrolly"
import { Nav } from "@/components/nav"
import { Code } from "@/components/code"

export default async function TutorialPage({
  params,
}: {
  params: { slug: string }
}) {
  const { getHike } = await import(`@/content/${params.slug}/tutorial.mdx`)

  const hike = getHike({ components: { Hike: "TODO fix" } })

  const hero = hike.hero[0]
  const sections = hike.sections
  const sectionNames = sections.map((section: any) => section.query)

  return (
    <>
      <Nav
        tutorial={params.slug}
        sections={["Introduction", ...sectionNames]}
      />
      <main className="overflow-x-clip">
        <header className="py-20 bg-black">
          <div className="max-w-3xl xl:max-w-4xl mx-auto prose prose-invert">
            <h3>SwiftUI essentials</h3>
            <h1>{hero.query}</h1>
            {hero.children}
          </div>
        </header>
        {sections.map((section: any, i: number) => (
          <Section
            key={i}
            header={section}
            steps={section.steps}
            number={i + 1}
          />
        ))}
      </main>
    </>
  )
}

async function Section({ header, steps, number }: any) {
  const content = steps.map((step: any) => ({
    sticker: step.code ? <Code codeblock={step.code[0]} /> : null,
  }))

  // const cover = header.cover?.[0].query
  // if (cover) {
  //   console.log({ cover })
  //   const img = await import(`@/content/building-lists-and-navigation/${cover}`)
  //   console.log(img.default)
  // }

  return (
    <section className="max-w-3xl xl:max-w-4xl mx-auto pt-20">
      <header className="prose mb-20">
        <h3>Section {number}</h3>
        <h2>{header.query}</h2>
        {header.children}
      </header>
      <Steps className="flex relative" steps={content}>
        <ScrollableContent steps={steps} />
        <div className="w-[calc(50vw+8.333%)] bg-zinc-100 flex-none ">
          <div className="top-12 sticky">
            <Step element="sticker" />
          </div>
        </div>
      </Steps>
    </section>
  )
}

function ScrollableContent({ steps }: { steps: any[] }) {
  return (
    <div className="flex-none mt-32 mb-[94vh] mr-[4.167%] w-[37.5%]">
      {steps.map((step: any, i: number) => (
        <ScrollyStep
          key={i}
          stepIndex={i}
          className={
            "border-l-8 border-transparent data-[ch-selected]:border-blue-400" +
            " px-5 py-4 mb-24 rounded-lg bg-zinc-50"
          }
        >
          <h4 className="mb-2 text-sm font-semibold">Step {i + 1}</h4>
          <div className="prose prose-hr:my-4">{step.children}</div>
        </ScrollyStep>
      ))}
    </div>
  )
}
