import { registerRoot } from "remotion"

import BlogExample from "./compositions/blog-example"
import Matt from "./compositions/matt"

registerRoot(function RemotionRoot() {
  return (
    <>
      <BlogExample />
      <Matt />
    </>
  )
})
