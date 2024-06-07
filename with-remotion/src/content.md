## !! A Game of Thrones

<!-- prettier-ignore -->
```jsx !
const element = <h1 title="foo">Hello</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

## !! A Clash of Kings

<!-- prettier-ignore -->
```jsx ! 
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
)
​
// !mark[/container/] #22449966 10 20
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

## !! A Storm of Swords

<!-- prettier-ignore -->
```jsx ! 
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

## !! A Feast for Crows

<!-- prettier-ignore -->
```jsx ! 
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
