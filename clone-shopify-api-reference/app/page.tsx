import Link from "next/link"

export default function Page() {
  return (
    <main className="prose prose-invert mx-auto max-w-2xl mt-36">
      <h1>Shopify API Reference Clone</h1>
      <p>
        Clone of{" "}
        <a
          href="https://shopify.dev/docs/api/admin-rest/2024-01/resources/order"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shopify API Reference
        </a>
        , built with Code Hike v1.
      </p>
      Pages:
      <ul>
        <li>
          <Link href="/order">Order</Link>
        </li>
      </ul>
      <p>
        Find the{" "}
        <a
          href="https://github.com/code-hike/examples/tree/main/clone-shopify-api-reference"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code on GitHub
        </a>
        . For more information, see the{" "}
        <a
          href="https://codehike.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Code Hike v1 docs
        </a>
        .
      </p>
    </main>
  )
}
