import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkCodeHike],
    recmaPlugins: [recmaCodeHike],
    jsx: true,
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
