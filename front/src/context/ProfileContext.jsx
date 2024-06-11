import axios from "axios";
import { createContext } from "react";
// import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUser";


export const ProfileContext = createContext(null)

export const ProfileProvider = ({children}) => {
    const {tokenJwt, user} = useUserContext()
    console.log(user)
    const BASE_URL = "https://s15-02-m-node-react-interbooks.onrender.com/api";

    const editProfile = async (dataUser, setLoading) => {
        const ENDPOINT = `/user/edit/${user.id}`;
        const RUTA = `${BASE_URL}${ENDPOINT}`;
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${tokenJwt}`,
            //   "userId": `${user.id}`
            }
          };
          const { data } = await axios.put(RUTA, dataUser, config);
          setLoading(false);
          return data;
        } catch (error) {
          throw new Error(error.message);
        }
      };

    const deleteProfile = async (setLoading) => {
        if (!user || !user.id) {
            throw new Error("User ID is not defined");
        }

        const ENDPOINT = `/user/delete/${user.id}`;
        // const ENDPOINT = `/user/delete/`;
        const RUTA = `${BASE_URL}${ENDPOINT}`;
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${tokenJwt}`,
            //   "userId": `${user.id}`
            }
          };
          const { data } = await axios.delete(RUTA, config);
          setLoading(false);
          return data;
        } catch (error) {
          throw new Error(error.message);
        }
      };

    const value = { editProfile , deleteProfile };
    
    return (
        <ProfileContext.Provider value={ value }>
            {children}
        </ProfileContext.Provider>
    )
}
