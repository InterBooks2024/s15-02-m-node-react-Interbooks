import React, { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M12 2L2 7l10 5 10-5L12 2z" fill="#3498db" />
              <path d="M12 13l10-5v10l-10 5-10-5V8l10 5z" fill="#2980b9" />
            </svg>
            <a
              href="#"
              className="text-lg font-semibold"
              style={{ color: "#33CCCC", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.color = "grey")}
              onMouseLeave={(e) => (e.target.style.color = "#33CCCC")}
            >
              Interbook
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="text-lg font-semibold"
                style={{ color: "#33CCCC", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "grey")}
                onMouseLeave={(e) => (e.target.style.color = "#33CCCC")}
              >
                Home
              </a>
              <a
                href="#"
                className="text-lg font-semibold"
                style={{ color: "grey", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#33CCCC")}
                a
                onMouseLeave={(e) => (e.target.style.color = "#33CCCC")}
              >
                Biblioteca
              </a>
              <a
                href="#"
                className="text-lg font-semibold"
                style={{ color: "grey", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#33CCCC")}
                onMouseLeave={(e) => (e.target.style.color = "#33CCCC")}
              >
                Wishlist
              </a>
              <a
                href="#"
                className="text-lg font-semibold"
                style={{ color: "grey", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.target.style.color = "#33CCCC")}
                onMouseLeave={(e) => (e.target.style.color = "#33CCCC")}
              >
                Intercambios
              </a>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Busqueda"
              className="bg-white-800 text-gray-300 rounded-full border-2 border-teal-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-400"
            />
          </div>
          <button
            type="button"
            className="ml-4 bg-teal-400 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-400"
          >
            Iniciar sesión
          </button>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
