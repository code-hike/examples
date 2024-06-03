import { HeroData, loadImage } from "@/lib/content"
import { slugify } from "@/lib/utils"
import { ArrowDownCircle, Hammer } from "lucide-react"

export async function Hero({ hero, slug }: { hero: HeroData; slug: string }) {
  const img = await loadImage(slug, hero.image)
  return (
    <header
      className="py-20 bg-black relative px-8"
      id={slugify("Introduction")}
    >
      <div
        className="absolute inset-0 bg-top bg-no-repeat bg-cover opacity-30"
        style={{ backgroundImage: `url(${img?.src})` }}
      />
      <div className="relative max-w-3xl xl:max-w-4xl mx-auto prose prose-invert">
        <h3>SwiftUI essentials</h3>
        <h1>{hero.title}</h1>
        <div className="max-w-lg">{hero.children}</div>
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
