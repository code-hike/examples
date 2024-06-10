```jsx !! Lorem
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  dolor = sit - amet(dolor)
  return dolor
}
```

```jsx !! Ipsum
// !mark[/dolor/mg] #3d53ac66 10 15
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  if (sit) {
    dolor = sit - amet(dolor)
    return dolor
  }
  return 10
}
```

<!-- prettier-ignore -->
```jsx !! Dolor
function lorem(ipsum, dolor = 1) {
  const sit =
    ipsum == null
      ? adipiscing(Math.random() * dolor)
      : ipsum.sit
  if (sit) {
    dolor = sit - amet(dolor)
    return dolor
  }
  // !callout[/elit/] Lorem ipsum dolor sit amet
  let { elit, sed } = incididunt(ipsum)
  return elit + sed
}
```
