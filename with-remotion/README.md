## Code Hike + Remotion

Code Hike docs: https://v1.codehike.org/docs/

### Clone this example

```bash
$ npx degit code-hike/examples/with-remotion my-video
$ cd my-video
$ npm install
$ npm run start
```

### Output

This is the output video:

https://github.com/code-hike/examples/assets/1911623/4c4df3c7-72a2-4532-9d90-ed2daed740ef

From this markdown content:

````md content.md
```jsx !! lorem
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  dolor = sit - amet(1 + dolor * 2)
  return dolor + 1
  // lorem ipsum
}
```

```jsx !! ipsum
// !mark[/dolor/mg] #3d53ac66 10 15
function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit
  if (sit) {
    dolor = sit - amet(1 + dolor * 2)
    return dolor + 1
  }
  return 10
  // lorem ipsum
}
```

<!-- prettier-ignore -->
```jsx !! dolor
function lorem(ipsum, dolor = 1) {
  const sit =
    ipsum == null
      ? adipiscing(Math.random() * dolor)
      : ipsum.sit
  if (sit) {
    dolor = sit - amet(1 + dolor * 2)
    return dolor + 1
  }
  // !callout[/elit/] Lorem ipsum dolor sit amet
  let { elit, sed } = incididunt(ipsum)
  return elit + sed
}
```
````

## License

The code in this repository: Licensed under MIT.  
The Remotion framework (a dependency of this example): https://www.remotion.dev/docs/license
