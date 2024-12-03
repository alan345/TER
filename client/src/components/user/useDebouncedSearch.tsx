import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const useDebouncedSearch = (initialValue: string, delay: number = 300) => {
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

  return { inputValue, setInputValue }
}

export default useDebouncedSearch
