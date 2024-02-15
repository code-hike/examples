"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { slugify } from "@/lib/utils"

export function Nav({
  tutorial,
  sections,
}: {
  tutorial: string
  sections: string[]
}) {
  return (
    <nav className="w-full bg-white border-b border-zinc-200 sticky top-0 z-10">
      <div className="flex gap-2 max-w-4xl mx-auto items-center h-12">
        <Link className="text-xl font-bold" href="/">
          CloneUI <span className="text-teal-600">Tutorials</span>
        </Link>
        <div className="mx-5 h-5 border-l border-zinc-200" />
        <TutorialSelect tutorial={tutorial} />
        <ChevronRight
          className="text-zinc-200 -mx-2"
          strokeWidth={1}
          size={28}
        />
        <SectionSelect sections={sections} />
      </div>
    </nav>
  )
}

function TutorialSelect({ tutorial }: { tutorial: string }) {
  const router = useRouter()
  return (
    <Select value={tutorial} onValueChange={(value) => router.push(value)}>
      <SelectTrigger className="min-w-56 max-w-72">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="creating-and-combining-views">
          Creating and combining views
        </SelectItem>
        <SelectItem value="building-lists-and-navigation">
          Building lists and navigation
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

function SectionSelect({ sections }: { sections: string[] }) {
  const [selected, setSelected] = useState("Introduction")
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelected(entry.target.id)
          }
        })
      },
      { rootMargin: "-15% 0% -80% 0%" },
    )
    sections.forEach((s) => {
      observer.observe(document.getElementById(slugify(s)) as Element)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <Select
      value={selected}
      onValueChange={(value) =>
        document.getElementById(value)?.scrollIntoView({ behavior: "smooth" })
      }
    >
      <SelectTrigger className="min-w-56 max-w-72">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sections.map((s) => (
          <SelectItem value={slugify(s)} key={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
