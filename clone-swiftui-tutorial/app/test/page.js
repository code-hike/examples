import { TwoTabs, Counter } from "./client"

// test keys in server components

export default function Page() {
  return (
    <TwoTabs
      one={<ServerThing key="one" />}
      two={<ServerThing key="two" />}
      three={1}
    />
  )
}

function ServerThing({ key }) {
  console.log({ key })
  return (
    <div style={{ border: "1px solid red" }}>
      <Counter />
    </div>
  )
}
