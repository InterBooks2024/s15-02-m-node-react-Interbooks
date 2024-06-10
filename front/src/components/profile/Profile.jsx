import './profile.css'
import { useEffect, useState } from "react";
import { MyLibrary } from "../myLibrary/MyLibrary";
import { MyExchanges } from "../myexchanges/MyExchanges";
import { MyWhishlist } from "../myWishlist/MyWhishlist";
import { MyProfile } from "../myProfile/MyProfile";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../hooks/useUser";

export const Profile = () => {
    const {tokenJwt, userId} = useUserContext()
    const location = useLocation()
    const navigate = useNavigate();
    useEffect(() => {
      const lastSegment = location.pathname.split('/').pop();
      switch (lastSegment) {
        case 'mylibrary':
          setTab('1')
          break;
        case 'myexchanges':
          setTab('2')
          break;
        case 'mywhishlist':
          setTab('3')
          break;
        case 'myprofile':
          setTab('4')
          break;
      
        default:
          setTab('1')
          break;
      }


    }, [location.pathname])
    
    const handleTabClick = (tabId, path) => {
      setTab(tabId);
      navigate(`/profile/${path}`);
    };
    const [tab, setTab] = useState();
    const tabSeleccionada = "bg-interbook-400 text-white font-bold border-2 rounded-t-lg"
    const tabNoSeleccionada = "bg-transparent cursor-base text-slate-400 hover:border-slate-900 dark:hover:border-slate-300  cursor-pointer"
  return (
    <section className='lg:w-[1024px] mx-auto overflow-hidden'>
      <div className="header-tabs flex overflow-x-auto whitespace-nowrap justify-center mx-auto select-none lg:w-[1024px] border-b-2 border-interbook-400">
        <div
          onClick={() => handleTabClick('1', 'mylibrary')}
          className={`header-tabs-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "1" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Mi biblioteca
        </div>

        <div
          onClick={() => handleTabClick('2', 'myexchanges')}
          className={`sidebar-category-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "2" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Mis Intercambios
        </div>

        <div
          onClick={() => handleTabClick('3', 'mywhishlist')}
          className={`sidebar-category-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "3" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Mi Wishlist
        </div>
        <div
          onClick={() => handleTabClick('4', 'myprofile')}
          className={`sidebar-category-item lg:w-80 inline-flex transition-all duration-300 justify-center items-center h-10 px-4 py-1 text-sm text-center border-slate-300 sm:text-base whitespace-nowrap focus:outline-none ${
            tab === "4" ? tabSeleccionada : tabNoSeleccionada
          }`}
        >
            Perfil de Usuario
        </div>
      </div>


      {/* <div className={`sidebar-subcategory-container select-none ${tab === '2' ? 'sidebar-sub-cont2' : (tab === '3' ? 'sidebar-sub-cont3' : (tab === '4' ? 'sidebar-sub-cont4' : ""))}`}> */}
      <div className='p-4'>
          {tab === '1' && <MyLibrary tokenJwt={tokenJwt} userId={userId} />}
          {tab === '2' && <MyExchanges tokenJwt={tokenJwt} userId={userId}/>}
          {tab === '3' && <MyWhishlist tokenJwt={tokenJwt} userId={userId}/>}
          {tab === '4' && <MyProfile tokenJwt={tokenJwt} userId={userId}/>}

      </div>

    </section>
  )
}
