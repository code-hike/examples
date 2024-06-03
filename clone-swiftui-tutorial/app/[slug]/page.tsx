import { Metadata } from "next"
import { getTutorial } from "@/lib/content"
import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Section, Step } from "@/components/section"
import { Quiz } from "@/components/quiz"

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
  const { hero, sections, quiz } = await getTutorial(params.slug, {
    components: { Step },
  })

  const sectionNames = [
    "Introduction",
    ...sections.map(({ title }) => title || ""),
    "Check your understanding",
  ]

  return (
    <>
      <Nav slug={params.slug} sections={sectionNames} />
      <main className="overflow-x-clip bg-white pb-12">
        <Hero hero={hero} slug={params.slug} />
        {sections.map((section, i) => (
          <Section
            key={i}
            section={section}
            slug={params.slug}
            number={i + 1}
          />
        ))}
        <Quiz quiz={quiz} />
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const { params } = props
  const { hero } = await getTutorial(params.slug, { components: { Step } })
  return {
    title: `${hero.title} — CloneUI Tutorials | Code Hike Examples`,
  }
}
