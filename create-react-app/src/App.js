import "./App.css"
/* eslint-disable import/no-webpack-loader-syntax */
import Content from "!@mdx-js/loader!./hello.mdx"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Content />
      </header>
    </div>
  )
}

export default App
