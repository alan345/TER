import { Link, useLocation } from "react-router-dom"

export const NavLinks = () => {
  const location = useLocation()

  return (
    <nav className="px-4 py-6">
      <Link
        to="/"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Home
      </Link>
      <Link
        to="/elements"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/elements" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Elements
      </Link>
      <Link
        to="/contact"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/contact" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Contact
      </Link>
      <Link
        to="/login"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/login" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        Login
      </Link>
    </nav>
  )
}
