import { slugify } from "@/lib/utils"
import { Code } from "@/components/code"
import { Preview } from "@/components/preview"
import { Selectable, Selection, SelectionProvider } from "codehike/utils"
import { RawCode } from "codehike/code"
import { SectionData, loadImage } from "@/lib/content"
import { Asset, AssetProvider } from "./context"

export async function Section({
  slug,
  section,
  number,
}: {
  slug: string
  section: SectionData
  number: number
}) {
  const { Step: blocks, title = "", children } = section

  const assets = blocks.map((step) => (
    <Sticker
      slug={slug}
      codeblock={step.code}
      screenshot={step.screenshot}
      preview={step.preview}
    />
  ))

  return (
    <section
      className="max-w-3xl xl:max-w-4xl mx-auto pt-20"
      id={slugify(title)}
    >
      <SectionHeader slug={slug} section={section} number={number} />
      <SelectionProvider className="md:flex relative hidden">
        <div className="flex-none mt-32 mb-[94vh] mr-[4.167%] w-[37.5%] [&>p]:px-7 [&>p]:mb-8 [&>p]:prose [&>p]:text-sm">
          {children}
        </div>
        <div className="w-[calc(50vw+8.333%)] bg-zinc-50 flex-none ">
          <div className="top-12 sticky h-[calc(100vh-3rem)]">
            <Selection from={assets} />
          </div>
        </div>
      </SelectionProvider>
      <div className="flex-none md:hidden mt-32 [&>p]:px-7 [&>p]:mb-8 [&>p]:prose [&>p]:text-sm">
        <AssetProvider assets={assets}>{children}</AssetProvider>
      </div>
    </section>
  )
}

async function SectionHeader({
  slug,
  section,
  number,
}: {
  slug: string
  section: SectionData
  number: number
}) {
  const { intro, title = "" } = section

  const coverImg = await loadImage(slug, intro.cover)
  return (
    <header className="md:mb-20 flex flex-col md:flex-row px-8 md:px-0">
      <div className="md:w-1/2 prose pr-7">
        <h3>Section {number}</h3>
        <h2>{title}</h2>
        {intro.children}
      </div>
      <div className="md:w-1/2 md:pl-7 flex items-center py-8 md:py-0">
        <img
          src={coverImg?.src}
          alt={coverImg?.alt}
          width={450}
          height="auto"
          className="mx-auto px-5 block"
        />
      </div>
    </header>
  )
}

export function Step({
  children,
  title,
  index,
}: {
  children: React.ReactNode
  title: string
  index: number
}) {
  return (
    <>
      <Selectable
        index={index}
        selectOn={["click", "scroll"]}
        className="border-l-8 border-blue-400 md:data-[selected=false]:border-transparent px-5 py-4 md:mb-24 rounded-lg bg-zinc-50 transition-colors mx-3 md:mx-0"
      >
        <h4 className="mb-2 text-sm font-semibold">{title}</h4>
        <div className="prose prose-hr:my-4 text-sm">{children}</div>
      </Selectable>
      <div className="md:hidden mb-20 mt-5">
        <Asset i={index} />
      </div>
    </>
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
  slug: string
  codeblock?: RawCode
  screenshot?: Image
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
    <div className="md:h-full flex items-center md:w-2/3 justify-center md:justify-normal">
      <img
        src={screenshotImg?.src}
        alt={screenshotImg?.alt}
        width={450}
        height="auto"
        className="md:ml-10 px-5 block md:max-w-[364px] xl:max-w-[531px] md:max-h-[calc(100vh-3rem-80px)]"
      />
    </div>
  )
}
