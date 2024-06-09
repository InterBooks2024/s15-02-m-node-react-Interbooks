import { useState } from "react";
import './profile.css'
import { MyLibriary } from "../myLibriary/MyLibriary";
export const Profile = () => {
    const [tab, setTab] = useState("1");
    const tabSeleccionada = "bg-interbook-400 text-white font-bold border-2 rounded-t-lg"
    const tabNoSeleccionada = "bg-transparent cursor-base text-slate-400 hover:border-slate-900 dark:hover:border-slate-300  cursor-pointer"
  return (
    <>
      <div className="header-tabs flex overflow-x-auto whitespace-nowrap justify-center mx-auto select-none lg:w-[1024px] border-b-2 border-interbook-400">
        <div
          onClick={() => setTab("1")}
          className={`header-tabs-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "1" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Mi biblioteca
        </div>

        <div
          onClick={() => setTab("2")}
          className={`sidebar-category-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "2" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Mis Intercambios
        </div>

        <div
          onClick={() => setTab("3")}
          className={`sidebar-category-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "3" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Mi Wishlist
        </div>
        <div
          onClick={() => setTab("4")}
          className={`sidebar-category-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "4" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Perfil de Usuario
        </div>
      </div>


      <div
          className={`sidebar-subcategory-container select-none ${tab === '2' ? 'sidebar-sub-cont2' : (tab === '3' ? 'sidebar-sub-cont3' : "")}`}>
          <div className="sidebar-subcategory">
            <MyLibriary/>
          </div>
          <div className="sidebar-subcategory">
              <p>Hola 2</p>
          </div>
          <div className="sidebar-subcategory">
              <p>Hola 3</p>
          </div>
          <div className="sidebar-subcategory">
              <p>Hola 4</p>
          </div>

      </div>

    </>
  )
}
