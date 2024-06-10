import { useMemo, useState } from "react";
import logo from "./logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUser";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {userId, setUserId, setTokenJwt} = useUserContext()

  const handleLogOut = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userId")
    setTokenJwt(null)
    setUserId(null)
    navigate("/")
  }
  const isLogged = useMemo(()=> userId?.length, [userId])
  
  return (
    <>
    <div className="espacio-solido w-full h-20"></div>  
    <nav className="w-full h-20 fixed top-0 left-0 right-0 z-10 bg-transparent"
          style={{
            WebkitBackdropFilter: 'blur(10px) saturate(180%)',
            backdropFilter: 'blur(10px) saturate(180%)',
            backgroundColor: '#f1fcfb23',
          }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            
            <Link
              to="/"
              className="text-lg font-semibold text-interbook-400 hover:text-interbook-500"
            >
              <img src={logo} alt="Logo Interbooks" height='32'/>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/"
                className="text-lg font-semibold  text-interbook-400 hover:text-interbook-500"
              >
                Home
              </Link>
              <Link to="/profile/mylibrary"
                className="text-lg font-semibold  text-interbook-400 hover:text-interbook-500"
              >
                Biblioteca
              </Link>
              <Link to="profile/mywhishlist"
                className="text-lg font-semibold  text-interbook-400 hover:text-interbook-500"
              >
                Wishlist
              </Link>
              <Link to="profile/myexchanges"
                className="text-lg font-semibold  text-interbook-400 hover:text-interbook-500"
              >
                Intercambios
              </Link>
            </div>
          </div>
          <div className="relative hidden">
            <input
              type="text"
              placeholder="Busqueda"
              className="bg-white-800 text-gray-300 focus:text-gray-600 rounded-full border-2 border-interbook-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-interbook-500"
            />
          </div>
          {
            !isLogged
            ? <Link
                to='/login'
                className="bg-interbook-400 w-full max-w-36 flex justify-center items-center text-white font-bold md:px-2 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500"
              >
              Iniciar sesión
              </Link>
              : <button
                  onClick={handleLogOut}
                  type="button"
                  className="ml-4 bg-interbook-400 text-white font-bold px-4 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500"
                >
                  Salir
                </button>
          }
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
    </>
  );
}

export default Navbar;
