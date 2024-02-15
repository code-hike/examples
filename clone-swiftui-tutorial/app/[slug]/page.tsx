import { Steps, ScrollyStep, Step } from "codehike/scrolly"
import { Nav } from "@/components/nav"
import { Code } from "@/components/code"
import { CodeBlock } from "codehike"
import { Preview } from "../../components/preview"

export default async function TutorialPage({
  params,
}: {
  params: { slug: string }
}) {
  const { getHike } = await import(`@/content/${params.slug}/tutorial.mdx`)
  const hike = getHike({ components: { Hike: "TODO fix" } })

  const hero = hike.hero[0]
  const quiz = hike.quiz[0]
  const sections = hike.sections
  const sectionNames = sections.map((section: any) => section.query)

  return (
    <>
      <Nav
        tutorial={params.slug}
        sections={["Introduction", ...sectionNames, "Check your understanding"]}
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
            section={section}
            slug={params.slug}
            number={i + 1}
          />
        ))}

        <Quiz quiz={quiz} />
        <footer className="py-20 bg-zinc-100"></footer>
      </main>
    </>
  )
}

async function Section({ slug, section, number }: any) {
  const { steps } = section
  const intro = section.intro?.[0] || section
  const content = steps.map((step: any) => ({
    sticker: (
      <Sticker
        slug={slug}
        codeblock={step.code?.[0]}
        screenshot={step.screenshot}
        preview={step.preview}
      />
    ),
  }))

  const coverImg = await loadImage(slug, intro.cover)

  return (
    <section className="max-w-3xl xl:max-w-4xl mx-auto pt-20">
      <header className=" mb-20 flex flex-row">
        <div className="w-1/2 prose pr-7">
          <h3>Section {number}</h3>
          <h2>{section.query}</h2>
          {intro.children}
        </div>
        <div className="w-1/2 pl-7 flex items-center">
          <img
            src={coverImg?.src}
            alt={coverImg?.alt}
            width={450}
            height="auto"
            className="mx-auto px-5 block"
          />
        </div>
      </header>
      <Steps className="flex relative" steps={content}>
        <ScrollableContent section={section} />
        <div className="w-[calc(50vw+8.333%)] bg-zinc-50 flex-none ">
          <div className="top-12 sticky h-[calc(100vh-3rem)]">
            <Step element="sticker" />
          </div>
        </div>
      </Steps>
    </section>
  )
}

function ScrollableContent({ section }: { section: any }) {
  const { steps } = section
  let i = 0

  return (
    <div className="flex-none mt-32 mb-[94vh] mr-[4.167%] w-[37.5%]">
      {section.children.map((child: any) => {
        if (child.type === "slot") {
          if (child.props.name === "steps") {
            const e = (
              <ScrollyStep
                key={i}
                stepIndex={i}
                className={
                  "border-l-8 border-transparent data-[ch-selected]:border-blue-400" +
                  " px-5 py-4 mb-24 rounded-lg bg-zinc-50"
                }
              >
                <h4 className="mb-2 text-sm font-semibold">{steps[i].query}</h4>
                <div className="prose prose-hr:my-4 text-sm">
                  {steps[i].children}
                </div>
              </ScrollyStep>
            )
            i++
            return e
          } else {
            return null
          }
        } else {
          return <div className="px-7 mb-8 prose text-sm">{child}</div>
        }
      })}
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
  preview,
}: {
  codeblock?: CodeBlock
  screenshot?: Image
  slug: string
  preview?: Image
}) {
  const screenshotImg = await loadImage(slug, screenshot)
  const previewImg = await loadImage(slug, preview)

  return codeblock ? (
    <div>
      <Code codeblock={codeblock} />
      <Preview preview={previewImg} />
    </div>
  ) : (
    <div className="h-full flex items-center w-2/3">
      <img
        src={screenshotImg?.src}
        alt={screenshotImg?.alt}
        width={450}
        height="auto"
        className="ml-10 px-5 block max-w-[364px] xl:max-w-[531px] max-h-[calc(100vh-3rem-80px)]"
      />
    </div>
  )
}

function Quiz({ quiz }: { quiz: any }) {
  return (
    <div className="max-w-3xl xl:max-w-4xl my-16 mx-auto bg-zinc-50 px-16 py-12">
      <h2 className="text-3xl text-center font-semibold">{quiz.query}</h2>
      <hr className="my-12" />
      <div className="text-sm text-zinc-600">Question 1 of 4</div>
      <p className="mt-8 text-lg font-semibold">
        When creating a custom SwiftUI view, where do you declare the view’s
        layout?
      </p>
      <p>TO DO</p>
    </div>
  )
}

async function loadImage(slug: string, img?: { url: string; alt: string }) {
  if (!img) return null
  const {
    default: { src, height, width },
  } = await import(`@/content/${slug}/${img.url}`)
  return {
    src,
    height,
    width,
    alt: img.alt,
  }
}
