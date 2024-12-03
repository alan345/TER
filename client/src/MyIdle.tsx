import { useContext, useEffect } from "react"
import { AppContext } from "./ContextProvider"

type Props = {
  children: React.ReactNode
}

const MyIdle = (props: Props) => {
  const context = useContext(AppContext)

  useEffect(() => {
    const interval = setInterval(() => {
      context.updateAuth()
    }, 1000 * 60)

    return () => clearInterval(interval) // Cleanup interval on component unmount
  }, [context])

  return <>{props.children}</>
}

export default MyIdle
