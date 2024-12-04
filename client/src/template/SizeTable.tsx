import React from "react"
import { useSearchParams } from "react-router-dom"

type Props = {
  initSize: number
}
export function SizeTable(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sizeUrl = searchParams.get("size")
  const [sizeInput, setSizeInput] = React.useState(sizeUrl || props.initSize.toString())

  return (
    <input
      type="number"
      className="w-11"
      placeholder="#"
      value={sizeInput}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSearchParams({ size: sizeInput })
        }
      }}
      onChange={(e) => {
        if (Number(e.target.value) < 100 && Number(e.target.value) >= 0) {
          setSizeInput(e.target.value)
        }
      }}
    />
  )
}
