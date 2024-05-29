import { diffArrays } from "diff"

export type SnapshotElement = {
  x: number
  y: number
  color: string
  content: string | null
}

type Flip = {
  element: Element
  first: SnapshotElement | null
  last: SnapshotElement
}

export function getFirstSnapshot(parent: HTMLElement): SnapshotElement[] {
  const elements = getFlipableElements(parent)
  return elements.map(toSnapshotElement)
}

export function animateChange(
  parent: HTMLElement,
  firstSnapshot: SnapshotElement[]
) {
  // TODO stop prev animations

  const flips = getFlips(parent, firstSnapshot)

  const { added, moved } = groupFlips(flips)
  const removeDuration = 0
  const moveDuration = fullStaggerDuration(moved.length, config.moveDuration)
  const addDuration = fullStaggerDuration(added.length, config.addDuration)

  moved.forEach((group, groupIndex) => {
    group.forEach((flip) => {
      const { first, last, element } = flip
      const delay =
        removeDuration +
        staggerDelay(
          groupIndex,
          moved.length,
          moveDuration,
          config.moveDuration
        )

      animateMove(element, first!, last, delay)
    })
  })

  added.forEach((group, groupIndex) => {
    group.forEach((flip) => {
      const { first, last, element } = flip
      const delay =
        removeDuration +
        moveDuration +
        staggerDelay(groupIndex, added.length, addDuration, config.addDuration)

      animateAdd(element, last, delay)
    })
  })
}

function animateMove(
  element: Element,
  first: SnapshotElement,
  last: SnapshotElement,
  delay: number
) {
  const dx = first.x - last.x
  const dy = first.y - last.y
  element.animate(
    {
      // opacity: [first.opacity, last.opacity],
      transform: [`translate(${dx}px, ${dy}px)`, "translate(0, 0)"],
      color: [first.color, last.color],
    },
    {
      duration: config.moveDuration,
      easing: "ease-in-out",
      fill: "backwards",
      delay,
    }
  )
}

function animateAdd(element: Element, last: SnapshotElement, delay: number) {
  element.animate(
    { opacity: [0, 1] },
    {
      duration: config.addDuration,
      fill: "both",
      easing: "ease-out",
      delay,
    }
  )
}

// ---

type Group = Flip[]

function groupFlips(flips: Flip[]): {
  added: Group[]
  moved: Group[]
} {
  const added: Group[] = []
  const forwards: Group[] = []
  const backwards: Group[] = []

  let lastBin: Group[] | null = null

  flips.forEach((flip) => {
    const { first, last } = flip
    let bin: Group[] | null = null

    if (!first) {
      bin = added
    } else if (first.x === last.x && first.y === last.y) {
      // unchanged
      bin = null
    } else {
      const dx = first.x - last.x
      const dy = first.y - last.y
      const bwd = dy > 0 || (dy == 0 && dx > 0)
      bin = bwd ? backwards : forwards
    }

    if (bin && bin !== lastBin) {
      bin.push([flip])
    } else if (bin) {
      bin[bin.length - 1].push(flip)
    }

    lastBin = bin
  })

  forwards.reverse()
  const moved = [...backwards, ...forwards]

  return { added, moved }
}

// ---
const config = {
  removeDuration: 100,
  moveDuration: 250,
  addDuration: 200,
}

function fullStaggerDuration(count: number, singleDuration: number) {
  if (count === 0) return 0
  return 2 * singleDuration * (1 - 1 / (1 + count))
  // return 1.5 * singleDuration - 1 / (1 + count)
}
function staggerDelay(
  i: number,
  n: number,
  duration: number,
  singleDuration: number
) {
  if (i === 0) return 0
  const max = duration - singleDuration
  return (i / (n - 1)) * max
}

// ---

function getFlips(parent: HTMLElement, firstSnapshot: SnapshotElement[]) {
  const elements = getFlipableElements(parent)
  // TODO stop prev animations

  const flips = elements.map((element) => ({
    element,
    first: null as SnapshotElement | null,
    last: toSnapshotElement(element),
  }))

  const firstContent = firstSnapshot.map((e) => e.content)
  const lastContent = flips.map((e) => e.last.content)
  diffList(firstContent, lastContent).forEach(([firstIndex, lastIndex]) => {
    flips[lastIndex].first = firstSnapshot[firstIndex]
  })
  return flips
}

function getFlipableElements(parent: HTMLElement): HTMLElement[] {
  // TODO check browser support (Firefox missing?)
  // return Array.from(parent.querySelectorAll(":not(:has(*))"))
  return Array.from(parent.querySelectorAll("span"))
}

function toSnapshotElement(el: HTMLElement): SnapshotElement {
  // const { x, y } = el.getBoundingClientRect()
  let x = 0
  let y = 0
  let p = el as any
  while (p) {
    x += p.offsetLeft
    y += p.offsetTop
    p = p.offsetParent
  }
  const style = window.getComputedStyle(el)
  const color = style.color
  const content = el.textContent

  return { x, y, color, content }
}

// Returns a list of [a, b], where a is the index of the item in the first array
// and b is the index of the item in the second array.
// only returns indices of items that are in both arrays.
export function diffList<T>(a: T[], b: T[]): [number, number][] {
  const result = diffArrays(a, b)
  const list: [number, number][] = []

  let ai = 0
  let bi = 0

  result.forEach(({ count, added, removed }) => {
    if (added) {
      bi += count!
    } else if (removed) {
      ai += count!
    } else {
      for (let i = 0; i < count!; i++) {
        list.push([ai++, bi++])
      }
    }
  })

  return list
}
