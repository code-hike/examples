import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Nav() {
  return (
    <nav className="w-full bg-white border-b border-zinc-200 sticky top-0">
      <div className="flex gap-2 max-w-4xl mx-auto items-center h-12">
        <h1 className="text-xl font-bold">
          CloneUI <span className="text-teal-600">Tutorials</span>
        </h1>
        <div className="mx-5 h-5 border-l border-zinc-200" />
        <TutorialSelect />
        <SectionSelect />
      </div>
    </nav>
  )
}

function TutorialSelect() {
  return (
    <Select>
      <SelectTrigger className="min-w-56 max-w-72">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="dark">Creating and combining views</SelectItem>
        <SelectItem value="light">Building lists and navigation</SelectItem>
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
