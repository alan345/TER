import { useContext } from "react"
import { NavLink } from "react-router"
import { AppContext } from "../ContextProvider"
import { House, Devices, Users, PencilLine, BeerStein } from "@phosphor-icons/react"

type Props = {
  onClick: () => void
}

const NavLinks = (props: Props) => {
  const context = useContext(AppContext)
  return (
    <nav className="px-4 py-6">
      <NavLink
        onClick={props.onClick}
        to="/"
        className={({ isActive }) =>
          `block py-2.5 px-4 rounded-sm transition ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
        }
      >
        <div className="flex items-center">
          <House className="mr-2" />
          Home
        </div>
      </NavLink>
      <NavLink
        onClick={props.onClick}
        to="/beers"
        className={({ isActive }) =>
          `block py-2.5 px-4 rounded-sm transition ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
        }
      >
        <div className="flex items-center">
          <BeerStein className="mr-2" />
          Beers
        </div>
      </NavLink>
      {context.me && (
        <NavLink
          onClick={props.onClick}
          to="/users"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded-sm transition ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
          }
        >
          <div className="flex items-center">
            <Users className="mr-2" />
            Users
          </div>
        </NavLink>
      )}
      {context.me && (
        <NavLink
          onClick={props.onClick}
          to="/devices"
          className={({ isActive }) =>
            `block py-2.5 px-4 rounded-sm transition ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
          }
        >
          <div className="flex items-center">
            <Devices className="mr-2" />
            Devices
          </div>
        </NavLink>
      )}
      <NavLink
        onClick={props.onClick}
        to="/contact"
        className={({ isActive }) =>
          `block py-2.5 px-4 rounded-sm transition ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`
        }
      >
        <div className="flex items-center">
          <PencilLine className="mr-2" />
          Contact
        </div>
      </NavLink>
      <a
        href="https://github.com/alan345/TER"
        className="block py-2.5 px-4 rounded-sm transition hover:bg-gray-100"
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
