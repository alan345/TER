import React from "react"
import levelpath from "../images/ter-logo.png"
import { AppRouting } from "../AppRouting"
import { AvatarMenu } from "../components/AvatarMenu"
import { NavLinks } from "./NavLinks"

export const LayoutApp = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="flex h-screen text-gray-600">
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-center h-24 ">
          <div>
            <a href="https://github.com/alan345/TER" target="_blank" rel="noopener noreferrer">
              <img src={levelpath} alt="logo" className="w-24" />
              <b>T</b>rpc <b>E</b>xpress <b>R</b>eact
            </a>
          </div>
        </div>
        <NavLinks />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <AvatarMenu />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <AppRouting />
        </main>
      </div>
    </div>
  )
}
