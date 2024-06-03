import { themeIcons } from "seti-icons"

const getLightIcon = themeIcons({
  blue: "#498ba7",
  grey: "#455155",
  "grey-light": "#627379",
  green: "#7fae42",
  orange: "#f05138",
  pink: "#dd4b78",
  purple: "#9068b0",
  red: "#b8383d",
  white: "#bfc2c1",
  yellow: "#b7b73b",
  ignore: "#3b4b52",
})

export function FileIcon({ filename }: { filename: string }) {
  const { svg, color } = getLightIcon(filename)
  const __html = svg.replace(/svg/, `svg fill='${color}'`)

  return (
    <span
      dangerouslySetInnerHTML={{ __html }}
      style={{
        display: "inline-block",
        height: "1.8em",
        width: "1.8em",
        margin: "-0.6em 0",
        marginRight: "0.5em",
      }}
    />
  )
}
