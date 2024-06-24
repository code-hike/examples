```ts !! a
type Lorem = {
  id: string
  name: string
  email: string
}

type Target = Lorem
//    ^?
```

```ts !! c
type Lorem = {
  id: string
  name: string
  email: string
}

type Ipsum = {
  [K in keyof Lorem]: () => Lorem[K]
}

type Target = Ipsum
//    ^?
```

```ts !! c
const hi = "Hello"
const message = `${hi}, world`
//    ^?

// @errors: 2588
message = 123
```
