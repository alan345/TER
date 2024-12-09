import useDebounced from "./useDebounced"
import { useLocation, useNavigate } from "react-router-dom"
import { XCircle } from "@phosphor-icons/react"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const search = query.get("search") || ""

  const [inputValue, setInputValue] = useDebounced(search)

  const clearInput = () => {
    setInputValue("")
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete("search")
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 h-8">
      <div className="relative">
        <input
          id="id-search"
          name="search"
          type="text"
          value={inputValue}
          placeholder="Search"
          style={{ paddingRight: "26px" }}
          onChange={(e) => {
            setInputValue(e.target.value)
            const searchParams = new URLSearchParams(location.search)
            searchParams.set("search", e.target.value)
            searchParams.delete("page")
            navigate(`${location.pathname}?${searchParams.toString()}`)
          }}
        />
        {inputValue && (
          <XCircle
            onClick={clearInput}
            id="cross-search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-green-600 transition-colors"
          />
        )}
      </div>
    </div>
  )
}

export default Search
