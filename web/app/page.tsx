export default function Home() {
  return (
    <main className="min-h-screen p-36">
      <h1 className="text-center text-6xl font-bold text-gray-100">
        Code Hike Examples
      </h1>
      <h2 className="text-center text-3xl  text-gray-300/80 mt-8 max-w-4xl mx-auto">
        Explore the examples below to see how Code Hike can be used to create
        interactive tutorials and documentation.
      </h2>
      <div className="flex items-center p-24">
        {examples.map((example, i) => (
          <Card key={i} {...example} />
        ))}
      </div>
    </main>
  )
}

function Card({ title, url, img }: any) {
  return (
    <a
      href={url}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={img} alt={title} className="mb-3" />
      <h2 className={`mb-3 text-2xl font-semibold`}>{title}</h2>
      <p className={`m-0  text-sm opacity-50 text-balance`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </a>
  )
}

const examples = [
  {
    title: "SwiftUI Tutorials Clone",
    url: "https://clone-swiftui-tutorial.vercel.app/",
    img: "/swiftui.png",
  },
  {
    title: "Shopify API Reference Clone",
    url: "https://clone-shopify-api-reference.vercel.app/",
    img: "/shopify.png",
  },
]
