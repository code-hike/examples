import { Steps, ScrollyStep, Step } from "codehike/scrolly"
import { Nav } from "@/components/nav"
import { Code } from "@/components/code"
import { CodeBlock } from "codehike"

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
            slug={params.slug}
          />
        ))}
      </main>
    </>
  )
}

async function Section({ slug, header, steps, number }: any) {
  const content = steps.map((step: any) => ({
    sticker: (
      <Sticker
        slug={slug}
        codeblock={step.code?.[0]}
        screenshot={step.screenshot}
      />
    ),
  }))

  const { cover } = header
  let src = ""

  if (cover) {
    const img = await import(`@/content/${slug}/${cover.url}`)
    console.log(img.default)
    src = img.default.src
  }

  return (
    <section className="max-w-3xl xl:max-w-4xl mx-auto pt-20">
      <header className=" mb-20 flex flex-row">
        <div className="w-1/2 prose pr-7">
          <h3>Section {number}</h3>
          <h2>{header.query}</h2>
          {header.children}
        </div>
        <div className="w-1/2 pl-7 flex items-center">
          <img
            src={src}
            width={450}
            height="auto"
            className="mx-auto px-5 block"
          />
        </div>
      </header>
      <Steps className="flex relative" steps={content}>
        <ScrollableContent steps={steps} />
        <div className="w-[calc(50vw+8.333%)] bg-zinc-100 flex-none ">
          <div className="top-12 sticky h-[calc(100vh-3rem)]">
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

type Image = {
  url: string
  alt: string
}
async function Sticker({
  slug,
  codeblock,
  screenshot,
}: {
  codeblock?: CodeBlock
  screenshot?: Image
  slug: string
}) {
  let src = ""

  if (screenshot) {
    const img = await import(`@/content/${slug}/${screenshot.url}`)
    console.log(img.default)
    src = img.default.src
  }
  return codeblock ? (
    <Code codeblock={codeblock} />
  ) : (
    <div className="h-full flex items-center w-2/3">
      <img
        src={src}
        width={450}
        height="auto"
        className="ml-10 px-5 block max-w-[364px] xl:max-w-[531px] max-h-[calc(100vh-3rem-80px)]"
      />
    </div>
  )
}
