import { Steps, ScrollyStep, Step } from "codehike/scrolly"
import { CodeBlock } from "codehike"
import { Nav } from "@/components/nav"
import { Code } from "@/components/code"
import { Preview } from "@/components/preview"
import { slugify } from "@/lib/utils"
import { ArrowDownCircle, Hammer } from "lucide-react"

export function generateStaticParams() {
  return [
    { slug: "creating-and-combining-views" },
    { slug: "building-lists-and-navigation" },
  ]
}

export default async function TutorialPage({
  params,
}: {
  params: { slug: string }
}) {
  const { getHike } = await import(`@/content/${params.slug}/tutorial.md`)
  const { hero, sections, quiz } = getHike()

  const sectionNames = [
    "Introduction",
    ...sections.map((section: any) => section.query),
    "Check your understanding",
  ]

  return (
    <>
      <Nav tutorial={params.slug} sections={sectionNames} />
      <main className="overflow-x-clip">
        <Hero hero={hero} />
        {sections.map((section: any, i: number) => (
          <Section
            key={i}
            section={section}
            slug={params.slug}
            number={i + 1}
          />
        ))}
        <Quiz quiz={quiz} />
        <footer className="py-20 bg-zinc-100" />
      </main>
    </>
  )
}

function Hero({ hero }: { hero: any }) {
  return (
    <header className="py-20 bg-black" id={slugify("Introduction")}>
      <div className="max-w-3xl xl:max-w-4xl mx-auto prose prose-invert">
        <h3>SwiftUI essentials</h3>
        <h1>{hero.query}</h1>
        {hero.children}
        <div className="flex mt-10">
          <div className="w-40 pr-8 flex flex-col items-center">
            <div className="text-4xl font-semibold mb-2">{hero.time}</div>
            <div className="text-sm">Estimated Time</div>
          </div>
          <div className="border-x border-zinc-200 w-36 flex flex-col items-center">
            <ArrowDownCircle size={44} strokeWidth={1.2} />
            <a href={hero.files} className="text-sm mt-1 no-underline">
              Project files
            </a>
          </div>
          <div className="w-48 flex flex-col items-center">
            <Hammer size={44} strokeWidth={1.2} />
            <a href={hero.xcode} className="text-sm mt-1 no-underline">
              Xcode 15 or later
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

async function Section({ slug, section, number }: any) {
  const { intro, steps } = section
  const content = steps.map((step: any) => ({
    sticker: (
      <Sticker
        slug={slug}
        codeblock={step.code}
        screenshot={step.screenshot}
        preview={step.preview}
      />
    ),
  }))

  const coverImg = await loadImage(slug, intro.cover)

  return (
    <section
      className="max-w-3xl xl:max-w-4xl mx-auto pt-20"
      id={slugify(section.query)}
    >
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
        if (child.type !== "slot") {
          return <div className="px-7 mb-8 prose text-sm">{child}</div>
        }
        const { index, name } = child.props
        if (name !== "steps") return null

        const { query, children } = steps[index]
        return (
          <ScrollyStep
            key={index}
            stepIndex={index}
            className="border-l-8 border-transparent data-[ch-selected]:border-blue-400 px-5 py-4 mb-24 rounded-lg bg-zinc-50"
          >
            <h4 className="mb-2 text-sm font-semibold">{query}</h4>
            <div className="prose prose-hr:my-4 text-sm">{children}</div>
          </ScrollyStep>
        )
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
    <section
      className="max-w-3xl xl:max-w-4xl my-16 mx-auto bg-zinc-50 px-16 py-12"
      id={slugify("Check your understanding")}
    >
      <h2 className="text-3xl text-center font-semibold">{quiz.query}</h2>
      <hr className="my-12" />
      <div className="text-sm text-zinc-600">Question 1 of 4</div>
      <p className="mt-8 text-lg font-semibold">
        When creating a custom SwiftUI view, where do you declare the view’s
        layout?
      </p>
      <p>TO DO</p>
    </section>
  )
}

async function loadImage(slug: string, img?: { url: string; alt: string }) {
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
