
const {Transformer} = require("@parcel/plugin")

module.exports = new Transformer({
  async transform({ asset }) {
    const {compile} = await import("@mdx-js/mdx")

    let code = await asset.getCode()
    let compiled = await compile(code)

    asset.type = "js"
    asset.setCode(`/* @jsxRuntime classic */
/* @jsx mdx */
import React from 'react';
import { mdx } from '@mdx-js/react'
${compiled}
`)

    return [asset]
  },
})
