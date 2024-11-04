import { CheckCircle } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

function SavedIconEffect() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 1000) // 2000ms = 2 seconds

    return () => clearTimeout(timer) // Clean up the timer on unmount
  }, [])

  return (
    <div className="">
      <div className={`transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}>
        <CheckCircle className="text-green-500" />
      </div>
    </div>
  )
}

export default SavedIconEffect
