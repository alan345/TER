import useDebounced from "./useDebounced"
import { useLocation, useNavigate } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const search = query.get("search") || ""

  const [inputValue, setInputValue] = useDebounced(search)

  return (
    <input
      id="id-search"
      name="search"
      type="text"
      value={inputValue}
      className="mb-4"
      placeholder="Search"
      onChange={(e) => {
        setInputValue(e.target.value)
        const searchParams = new URLSearchParams(location.search)
        searchParams.delete("page")
        navigate(`${location.pathname}?${searchParams.toString()}`)
      }}
    />
  )
}

export default Search
