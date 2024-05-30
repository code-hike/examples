import { parseRoot } from "codehike/blocks"
import Link from "next/link"

import { Schema } from "./[slug]/page"

export default async function App() {
  return (
    <main className="bg-zinc-900 prose prose-invert max-w-none prose-a:no-underline">
      <section className="pt-24 pb-8  text-center text-lg max-w-lg mx-auto ">
        <h1>SwiftUI Tutorials Clone</h1>
        <p>
          This is a clone of the{" "}
          <a href="https://developer.apple.com/tutorials/swiftui">
            SwiftUI Tutorials
          </a>{" "}
          website. Built with <a href="https://v1.codehike.org">Code Hike v1</a>
          . Find the source code on{" "}
          <a href="https://github.com/code-hike/examples/tree/main/clone-swiftui-tutorial">
            GitHub
          </a>
          .
        </p>
      </section>

      <section className="bg-black pt-1 pb-24">
        <h2 className="text-center text-3xl">Tutorials</h2>
        <div className="max-w-lg mx-auto flex flex-col gap-2 rounded-lg overflow-hidden ">
          <Tutorial slug="creating-and-combining-views" />
          <Tutorial slug="building-lists-and-navigation" />
        </div>
      </section>
    </main>
  )
}

async function Tutorial({ slug }: { slug: string }) {
  const { default: Content } = await import(`@/content/${slug}/tutorial.md`)
  const { hero } = parseRoot(Content, Schema, {
    components: { Step: () => null },
  })
  const img = await loadImage(slug, hero.image)
  return (
    <Link
      href={slug}
      className="bg-zinc-800 relative flex-1 px-8 py-4 hover:bg-zinc-700"
      title={hero.title}
    >
      <div
        className="absolute inset-0 bg-top bg-no-repeat bg-cover opacity-30"
        style={{ backgroundImage: `url(${img?.src})` }}
      />
      <div className="relative w-64 text-pretty">
        <h2 className="my-4">{hero.title}</h2>
        <span className="text-zinc-400">Estimated time: {hero.time}</span>
      </div>
    </Link>
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
