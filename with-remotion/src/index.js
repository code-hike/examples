import { registerRoot } from "remotion"

import BlogExample from "./compositions/blog-example"
import Matt from "./compositions/matt"
import Delba from "./compositions/delba"
import Pomber from "./compositions/pomber"

registerRoot(function RemotionRoot() {
  return (
    <>
      <BlogExample />
      <Matt />
      <Delba />
      <Pomber />
    </>
  )
})
