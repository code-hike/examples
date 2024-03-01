// @ts-ignore
import { getBlocks } from "@/content/order.md"
import { parseContent } from "./schema"
import Link from "next/link"
import { Layout } from "./api-layout"

const content = parseContent(getBlocks())

export const metadata = {
  title: content.intro.query,
}

export default function Page() {
  return (
    <>
      <nav className="border-b border-[#133a48] py-2 text-[#bedbeb] flex gap-4 max-w-6xl mx-auto px-10 items-center">
        <Link href="/" className="hover:text-white font-bold">
          Shopiclone
        </Link>
        <a
          href="https://shopify.dev/docs/api/admin-rest/2024-01/resources/order"
          className="hover:text-white"
        >
          Original
        </a>
        <a
          href="https://github.com/code-hike/examples/tree/main/clone-shopify-api-reference"
          className="hover:text-white ml-auto"
        >
          GitHub
        </a>
      </nav>
      <Layout
        content={content}
        className="prose prose-invert prose-hr:border-[#133a48] max-w-6xl mx-auto px-10"
      />
      <footer className="h-32 bg-zinc-900 mt-12" />
    </>
  )
}
