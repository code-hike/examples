import { MDXRemote } from "next-mdx-remote/rsc"
import { promises as fs } from "fs"

const components = {
  h1: (props) => (
    <h1 {...props} style={{ color: "red" }}>
      {props.children}
    </h1>
  ),
}

export default async function Home() {
  const md = await fs.readFile("./content/index.md", "utf-8")
  return <MDXRemote source={md} components={components} />
}
