import { Link, useLocation } from "react-router-dom"

type Props = {
  onClick: () => void
}
export const NavLinks = (props: Props) => {
  const location = useLocation()

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
      <Link
        onClick={props.onClick}
        to="/contact"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/contact" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Contact
      </Link>
    </nav>
  )
}
