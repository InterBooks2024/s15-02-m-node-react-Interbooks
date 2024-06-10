import { createContext, useEffect, useState } from "react";


export const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const storageToken = localStorage.getItem("jwt") || ''
    const storageUser = JSON.parse(localStorage.getItem("user")) || ''
    const [tokenJwt, setTokenJwt] = useState(storageToken)
    const [user, setUser] = useState(storageUser)

    useEffect(()=>{
        if(tokenJwt?.length && user?.id?.length){
            localStorage.setItem("jwt", tokenJwt)
            localStorage.setItem("user", JSON.stringify(user))
        }
    },[tokenJwt, user])

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            tokenJwt,
            setTokenJwt
        }}>
            {children}
        </UserContext.Provider>
    )
}
