## !! A Game of Thrones

<!-- prettier-ignore -->
```js !
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

## !! A Clash of Kings

<!-- prettier-ignore -->
```js ! 
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

## !! A Storm of Swords

<!-- prettier-ignore -->
```js ! 
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

## !! A Feast for Crows

<!-- prettier-ignore -->
```js ! 
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

## !! A Dance with Dragons

<!-- prettier-ignore -->
```js ! 
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

## !! The Winds of Winter

<!-- prettier-ignore -->
```js ! 
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

## !! A Dream of Spring

<!-- prettier-ignore -->
```js ! 
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
