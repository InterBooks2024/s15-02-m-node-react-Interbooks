import { createContext, useEffect, useState } from "react";


export const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const storageToken = localStorage.getItem("jwt") || ''
    const storageUserId = localStorage.getItem("userId") || ''
    const [tokenJwt, setTokenJwt] = useState(storageToken)
    const [userId, setUserId] = useState(storageUserId)


    useEffect(()=>{
        if(tokenJwt?.length && userId?.length){
            localStorage.setItem("jwt", tokenJwt)
            localStorage.setItem("userId", userId)
        }
    },[tokenJwt, userId])
    return (
        <UserContext.Provider value={{
            userId,
            setUserId,
            tokenJwt,
            setTokenJwt
        }}>
            {children}
        </UserContext.Provider>
    )
}
