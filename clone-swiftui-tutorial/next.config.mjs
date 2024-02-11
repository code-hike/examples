import { remarkCodeHike, recmaCodeHike } from "codehike/mdx";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkCodeHike],
    recmaPlugins: [recmaCodeHike],
    jsx: true,
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
