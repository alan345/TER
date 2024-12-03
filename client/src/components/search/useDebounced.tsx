import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useDebounced = (initialValue: string) => {
  const delay = 400
  const [inputValue, setInputValue] = useState(initialValue)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchParams = new URLSearchParams(location.search)
      searchParams.set("search", inputValue)
      navigate(`${location.pathname}?${searchParams.toString()}`)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue, location.pathname, navigate, location.search, delay])

  return [inputValue, setInputValue] as const
}

export default useDebounced
