import { useLocation, useNavigate } from "react-router-dom"
import { XCircle } from "@phosphor-icons/react"

const ChipUserId = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const userId = searchParams.get("userId") || undefined

  if (!userId) return null
  return (
    <div className="inline-flex items-center bg-gray-200 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full gap-2">
      <span className="mr-1">userId:</span> {userId}
      <XCircle
        className="text-xl cursor-pointer"
        onClick={() => {
          searchParams.delete("userId")

          navigate(`${location.pathname}?${searchParams.toString()}`)
        }}
      />
    </div>
  )
}

export default ChipUserId
