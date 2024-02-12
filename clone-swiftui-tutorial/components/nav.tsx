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

export function Nav({ tutorial }: { tutorial: string }) {
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
        <SectionSelect />
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

function SectionSelect() {
  return (
    <Select>
      <SelectTrigger className="min-w-56 max-w-72">
        <SelectValue placeholder="Section" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="swiftui">Introduction</SelectItem>
        <SelectItem value="react">
          Create a new project and explore the canvas
        </SelectItem>
        <SelectItem value="tailwind">Customize the text view</SelectItem>
      </SelectContent>
    </Select>
  )
}
