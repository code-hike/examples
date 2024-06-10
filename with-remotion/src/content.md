```jsx !! Lorem
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

```jsx !! Ipsum
// !mark[/element/] #7dd3fc44 10 15
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
)
​
// !mark[/container/] #8b5cf644 15 15
const container = document.getElementById("root")
// !mark[/element/] #7dd3fc44 25 15
// !mark[/container/] #8b5cf644 25 15
ReactDOM.render(element, container)
```

```jsx !! Dolor
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
​
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

```jsx !! Sit
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
​
const container = document.getElementById("root")
​
const node = document.createElement(element.type)
node["title"] = element.props.title
​
const text = document.createTextNode("")
text["nodeValue"] = element.props.children
​
node.appendChild(text)
container.appendChild(node)
```
