import { registerRoot } from "remotion"

import BlogExample from "./compositions/blog-example"
import Matt from "./compositions/matt"
import Delba from "./compositions/delba"

registerRoot(function RemotionRoot() {
  return (
    <>
      <BlogExample />
      <Matt />
      <Delba />
    </>
  )
})
