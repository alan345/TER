import { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AppContext } from "../ContextProvider"
import { House, Devices, Users, PencilLine, BeerStein } from "@phosphor-icons/react"

type Props = {
  onClick: () => void
}

const NavLinks = (props: Props) => {
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
        <div className="flex items-center">
          <House className="mr-2" />
          Home
        </div>
      </Link>
      <Link
        onClick={props.onClick}
        to="/beers"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/beers" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          <BeerStein className="mr-2" />
          Beers
        </div>
      </Link>
      {context.me && (
        <Link
          onClick={props.onClick}
          to="/users"
          className={`block py-2.5 px-4 rounded transition ${
            location.pathname === "/users" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <Users className="mr-2" />
            Users
          </div>
        </Link>
      )}
      {context.me && (
        <Link
          onClick={props.onClick}
          to="/devices"
          className={`block py-2.5 px-4 rounded transition ${
            location.pathname === "/devices" ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center">
            <Devices className="mr-2" />
            Devices
          </div>
        </Link>
      )}
      <Link
        onClick={props.onClick}
        to="/contact"
        className={`block py-2.5 px-4 rounded transition ${
          location.pathname === "/contact" ? "bg-gray-200" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center">
          <PencilLine className="mr-2" />
          Contact
        </div>
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
export default NavLinks
