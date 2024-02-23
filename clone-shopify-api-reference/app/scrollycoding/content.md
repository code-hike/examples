## !intro Scrollycoding Example

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus elit, tincidunt consectetur auctor ac, dignissim eget dolor. Integer magna ante, dictum ut posuere sed, faucibus quis risus.

Phasellus id dolor lacinia, commodo nisl non, condimentum ante. Nam diam augue, tempor quis condimentum eget, luctus vitae felis. Aenean maximus ultrices massa ac viverra. Nullam tellus enim, tincidunt ac ligula eu, placerat vulputate justo. Vivamus non dui malesuada, mattis dolor vitae, aliquam ipsum. Sed dapibus nibh nisi, sit amet consectetur sapien scelerisque at.

## !!steps A Game of Thrones

A Game of Thrones is the first book in the A Song of Ice and Fire series by George R.R. Martin. Set in a world where seasons last for years, it introduces a complex plot and a wide cast of characters, ranging from noble families vying for the Iron Throne to the supernatural threats in the North.

```js ! george.js
const houses = [
  "Stark",
  "Lannister",
  "Baratheon",
  "Targaryen",
]

const winner =
  houses[
    Math.floor(
      Math.random() * houses.length,
    )
  ]

console.log(`Iron Throne: ${winner}`)
```

## !!steps A Clash of Kings

A Clash of Kings, the second book in the series, continues the epic saga. The Seven Kingdoms are plunged into war, with kings rising and falling. Meanwhile, Daenerys Targaryen seeks to return to Westeros with her growing dragons.

```js ! george.js
const houses = [
  "Stark",
  "Lannister",
  "Baratheon",
  "Targaryen",
]

const clash = () => {
  const winner =
    houses[
      Math.floor(
        Math.random() * houses.length,
      )
    ]
  return `${winner} wins the battle!`
}

console.log(clash())
```

## !!steps A Storm of Swords

The third book, A Storm of Swords, is known for its intense and shocking developments. Battles rage on, alliances shift, and characters face unexpected challenges and betrayals, making it one of the most thrilling books in the series.

```js ! george.js
const houses = [
  "Stark",
  "Lannister",
  "Baratheon",
]

const reveal = () => {
  const traitor =
    houses[
      Math.floor(
        Math.random() * houses.length,
      )
    ]
  return `${traitor} betrays the alliance!`
}

console.log(reveal())
```

## !!steps A Feast for Crows

A Feast for Crows, the fourth book, explores the aftermath of the wars, with a focus on the characters in the southern regions of Westeros. It delves into the politics and power struggles in a kingdom weary of battle.

```js ! george.js
const houses = [
  "Martell",
  "Lannister",
  "Baratheon",
  "Tyrell",
]

const intrigue = () => {
  const ally1 =
    houses[
      Math.floor(
        Math.random() * houses.length,
      )
    ]
  const ally2 =
    houses[
      Math.floor(
        Math.random() * houses.length,
      )
    ]
  return `${ally1} and ${ally2} form an alliance!`
}

console.log(intrigue())
```

## !!steps A Dance with Dragons

A Dance with Dragons, the fifth book, runs concurrently with A Feast for Crows and focuses on the characters in the North and across the Narrow Sea. The story advances with dragons, the Night’s Watch, and the lingering threat of winter.

```js ! george.js
const houses = [
  "Stark",
  "Lannister",
  "Baratheon",
  "Targaryen",
]

const dragons = () => {
  const dragon =
    houses[
      Math.floor(
        Math.random() * houses.length,
      )
    ]
  return `${dragon} has a dragon!`
}

console.log(dragons())
```

## !!steps The Winds of Winter

The Winds of Winter, the anticipated sixth book, is expected to continue the intricate storylines and bring new twists and turns to the world of Westeros. Fans eagerly await its release.

```js ! george.js
const houses = [
  "Stark",
  "Lannister",
  "Baratheon",
  "Targaryen",
  "Martell",
  "Tyrell",
  "Greyjoy",
]

const winterIsComing = () => {
  const isComing = Math.random() > 0.99
  if (isComing) {
    return "Winter is coming!"
  } else {
    return "Winter is not coming."
  }
}

console.log(winterIsComing())
```

## !!steps A Dream of Spring

A Dream of Spring is the proposed final book in the series, anticipated to conclude the epic saga. It remains one of the most awaited books in modern fantasy literature.

```js ! george.js
const houses = [
  "Stark",
  "Lannister",
  "Baratheon",
  "Targaryen",
  "Martell",
  "Tyrell",
  "Greyjoy",
]

const keepDreaming = () => {
  return "Not gonna happen..."
}

console.log(keepDreaming())
```

## !outro

Quisque id pretium neque. Vestibulum metus orci, pretium nec varius convallis, viverra quis urna. Praesent luctus, purus nec tempus placerat, justo lorem auctor ligula, ut condimentum tellus velit ac erat. Fusce ut dictum libero. Vestibulum ipsum mauris, cursus sed tortor at, rhoncus viverra ipsum. Donec odio dolor, varius quis congue posuere, tempor et justo. Praesent at scelerisque metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed malesuada leo vitae mauris eleifend condimentum. Proin auctor, ex ac aliquam gravida, felis felis lacinia libero, efficitur aliquet nulla neque sed elit. Vestibulum congue aliquam risus, sit amet rutrum magna euismod ac. Integer posuere neque nec ex sollicitudin rhoncus.
