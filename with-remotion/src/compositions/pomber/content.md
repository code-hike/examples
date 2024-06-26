## !!steps enter content

!duration 180

```jsx !code

```

````md !content focus
```js
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

## !!steps enter code

!duration 180

```jsx !code focus
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return <Pre code={codeblock} />
}
```

````md !content
```js
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

## !!steps enter output

!duration 180

```jsx !code
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return <Pre code={codeblock} />
}
```

````md !content
```js
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

```js !output focus
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```

## !!steps enter mark

!duration 180

```jsx !code
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return <Pre code={codeblock} />
}
```

````md !content focus
```js
function lorem(ipsum, dolor = 1) {
  // !mark
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

```js !output
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```

## !!steps mark name

!duration 180

```jsx !code focus
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return <Pre code={codeblock} />
}

const markHandler = {
  name: "mark",
}
```

````md !content
```js
function lorem(ipsum, dolor = 1) {
  // !mark
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

```js !output
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```

## !!steps mark block

!duration 220

```jsx !code focus
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return <Pre code={codeblock} />
}

const markHandler = {
  name: "mark",
  Block: ({ children }) => (
    <div style={{ background: "#58a6ff44" }}>
      {children}
    </div>
  ),
}
```

````md !content
```js
function lorem(ipsum, dolor = 1) {
  // !mark
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

```js !output
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```

## !!steps handlers

!duration 180

```jsx !code focus
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return (
    <Pre code={codeblock} handlers={[markHandler]} />
  )
}

const markHandler = {
  name: "mark",
  Block: ({ children }) => (
    <div style={{ background: "#58a6ff44" }}>
      {children}
    </div>
  ),
}
```

````md !content
```js
function lorem(ipsum, dolor = 1) {
  // !mark
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

```js !output
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```

## !!steps show handler output

!duration 240

```jsx !code
import { Pre } from "codehike/code"

export function Code({ codeblock }) {
  return (
    <Pre code={codeblock} handlers={[markHandler]} />
  )
}

const markHandler = {
  name: "mark",
  Block: ({ children }) => (
    <div style={{ background: "#58a6ff44" }}>
      {children}
    </div>
  ),
}
```

````md !content
```js
function lorem(ipsum, dolor = 1) {
  // !mark
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
````

```js !output focus
function lorem(ipsum, dolor = 1) {
  // !!mark fadein
  const sit = ipsum == null ? 0 : 1
  dolor = sit - amet(dolor)
  return sit ? foo(ipsum) : []
}
```
