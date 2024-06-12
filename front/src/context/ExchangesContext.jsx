import axios from "axios";
import { createContext } from "react";
// import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUser";


export const ExchangesContext = createContext(null)

export const ExchangesProvider = ({children}) => {
    const {tokenJwt, user} = useUserContext()
    const BASE_URL = "https://s15-02-m-node-react-interbooks.onrender.com/api";
    const config = {
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${tokenJwt}`,
      }
    }

    const generateExchange = async (bookid, action, setIsLoading) => {
        const ENDPOINT = `/exchange/${bookid}`
        const RUTA = `${BASE_URL}${ENDPOINT}`
        const body = {body: {"actions": action}}

        try {
          setIsLoading(true)
          const { data } = await axios.post(RUTA, body, config)
          setIsLoading(false)
          return data
        } catch (error) {
          setIsLoading(false)
          throw new Error(error.message)
        }
    }
    // const clearUserData = () => {
    //   localStorage.removeItem("jwt")
    //   localStorage.removeItem("user")
    //   setTokenJwt(null)
    //   setUser(null)
    // }

    // const editProfile = async (dataUser, setLoading) => {
    //     const ENDPOINT = `/user/edit/${user.id}`;
    //     const RUTA = `${BASE_URL}${ENDPOINT}`;
    //     try {
    //       const config = {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "authorization": `Bearer ${tokenJwt}`,
    //         }
    //       };
    //       const { data } = await axios.patch(RUTA, dataUser, config);
    //       setLoading(false);
    //       return data;
    //     } catch (error) {
    //       throw new Error(error.message);
    //     }
    //   };

    // const deleteProfile = async (setLoading) => {
    //     if (!user || !user.id) {
    //         throw new Error("User ID is not defined");
    //     }

    //     const ENDPOINT = `/user/delete/${user.id}`;
    //     const RUTA = `${BASE_URL}${ENDPOINT}`;
    //     try {
    //       const config = {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "authorization": `Bearer ${tokenJwt}`,
    //         }
    //       };
    //       const { data } = await axios.delete(RUTA, config);
    //       setLoading(false);
    //       clearUserData();
    //       return data;
    //     } catch (error) {
    //       throw new Error(error.message);
    //     }
    //   };

    const value = { generateExchange };
    
    return (
        <ExchangesContext.Provider value={ value }>
            {children}
        </ExchangesContext.Provider>
    )
}
