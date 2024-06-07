import { createContext, useContext, useEffect, useState } from "react";


export const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const [tokenJwt, setTokenJwt] = useState(null)
    const [user, setUser] = useState(null)


    useEffect(()=>{
        localStorage.setItem("jwt", tokenJwt)
    },[tokenJwt])
    return (
        <UserContext.Provider value={{
            user,
            setTokenJwt
        }}>
            {children}
        </UserContext.Provider>
    )
}
