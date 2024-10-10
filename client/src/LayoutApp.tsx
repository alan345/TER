import React from "react";
import levelpath from "./images/ter-logo.png";
import { Routing } from "./Routing";
import { Link } from "react-router-dom";

export function LayoutApp() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen text-gray-600">
      <div
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-gray-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-center h-24 ">
          <div>
            <a href="https://github.com/alan345/TER" target="_blank">
              <img src={levelpath} alt="logo" className="w-24" />
              <b>T</b>rpc <b>E</b>xpress <b>R</b>eact
            </a>
          </div>
        </div>
        <nav className="px-4 py-6">
          <Link
            to="/"
            className="block py-2.5 px-4 rounded hover:bg-gray-100 transition"
          >
            Home
          </Link>
          <Link
            to="/elements"
            className="block py-2.5 px-4 rounded hover:bg-gray-100 transition"
          >
            Elements
          </Link>
          <Link
            to="/contact"
            className="block py-2.5 px-4 rounded hover:bg-gray-100 transition"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="block py-2.5 px-4 rounded hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4">
          <div className="flex items-center">
            {/* Burger Menu for Mobile */}
            <button
              className="text-gray-500 focus:outline-none md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
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
                  d={
                    sidebarOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Routing />
        </main>
      </div>
    </div>
  );
}
