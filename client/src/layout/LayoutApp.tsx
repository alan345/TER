import React, { useEffect, useRef } from "react"
import AppRouter from "../AppRouter"
import AvatarMenu from "../auth/AvatarMenu"
import NavLinks from "./NavLinks"
import BurgerLogic from "./BurgerLogic"
import LogoTer from "./LogoTer"

const LayoutApp = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click is outside the sidebar
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [sidebarRef])

  return (
    <div className="flex h-screen text-gray-600">
      <div
        ref={sidebarRef} // Reference to the sidebar
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <LogoTer />
        <NavLinks onClick={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <BurgerLogic sidebarOpen={sidebarOpen} />
            </button>
          </div>
          <div className="flex items-center">
            <AvatarMenu />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <AppRouter />
        </main>
      </div>
    </div>
  )
}

export default LayoutApp
