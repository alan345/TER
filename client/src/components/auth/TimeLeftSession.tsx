import React from "react"

type Props = {
  exp: number
}
const TimeLeftSession = (props: Props) => {
  const [time, setTime] = React.useState(Date.now())

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now())
    }, 1000) // Update every second

    return () => clearInterval(intervalId) // Cleanup on unmount
  }, [])

  return <div>Time Left: {new Date(Math.max(0, props.exp * 1000 - time)).toISOString().slice(11, 19)}</div>
}
export default TimeLeftSession
