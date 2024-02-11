import Link from "next/link"

export default function App() {
  return (
    <main className="prose max-w-4xl mx-auto">
      <section className="pt-28 text-center text-lg font-bold max-w-lg mx-auto">
        <h1>SwiftUI Tutorials Clone</h1>
        <p>
          This is a clone of the{" "}
          <a href="https://developer.apple.com/tutorials/swiftui">
            SwiftUI Tutorials
          </a>{" "}
          website, built with Code Hike v1.
        </p>
      </section>
      <section className="bg-zinc-100 rounded p-4 max-w-lg mx-auto mt-16">
        <h2 className="m-2 mb-6 text-center">Tutorials</h2>
        <ul className="list-image-[url(tutorial-icon.svg)]">
          <li>
            <Link href="/creating-and-combining-views">
              Creating and combining views
            </Link>
          </li>
          <li>
            <Link href="/building-lists-and-navigation">
              Building lists and navigation
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
