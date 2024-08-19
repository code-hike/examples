import { Code } from "./components/code"

/** @type {import('nextra-theme-docs').DocsThemeConfig } */
const config = {
  logo: <span>My Nextra Documentation</span>,
  project: {
    link: "https://github.com/code-hike/codehike",
  },
  components: {
    Code,
  },
}

export default config
