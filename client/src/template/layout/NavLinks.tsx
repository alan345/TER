import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AppContext } from "../../ContextProvider"

type Props = {
  onClick: () => void
}
export const NavLinks = (props: Props) => {
  const location = useLocation()
  const context = useContext(AppContext)
  return (
    <nav className="px-4 py-6">
      <Link
        onClick={props.onClick}
        to="/"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Home
      </Link>
      <Link
        onClick={props.onClick}
        to="/elements"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/elements" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Elements
      </Link>
      {context.me && (
        <Link
          onClick={props.onClick}
          to="/users"
          className={`block py-2.5 px-4 rounded transition ${
            location.pathname === "/users" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          Users
        </Link>
      )}
      <Link
        onClick={props.onClick}
        to="/contact"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/contact" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Contact
      </Link>
      <a
        href="https://github.com/alan345/TER"
        className="block py-2.5 px-4 rounded transition hover:bg-gray-100"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
          alt="GitHub"
          className="inline-block h-6 w-6"
        />
      </a>
    </nav>
  )
}
