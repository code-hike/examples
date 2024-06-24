## !!steps Before

!duration 180

```jsx ! app/cart/actions.ts
"use server"

import { cart, type AddToCartState } from "@/services/cart"
import { metrics } from "@/services/metrics"

export async function addToCart(
  state: AddToCartState,
  data: FormData
): Promise<AddToCartState> {
  const id = data.get("id")
  const productId = data.get("productId")

  const { status, message } = await cart.add(id, productId)

  // !mark[3:55] 55 50
  await metrics.send("cart", { id, productId, status })

  return { status, message }
}
```

## !!steps After

!duration 420

```jsx ! app/cart/actions.ts
"use server"

import { cart, type AddToCartState } from "@/services/cart"
import { metrics } from "@/services/metrics"
// !mark[28:32] 80
import { unstable_after as after } from "next/server"

export async function addToCart(
  state: AddToCartState,
  data: FormData
): Promise<AddToCartState> {
  const id = data.get("id")
  const productId = data.get("productId")

  const { status, message } = await cart.add(id, productId)

  // !mark[/after/] 110
  after(async () => {
    await metrics.send("cart", { id, productId, status })
  })

  return { status, message }
}
```
