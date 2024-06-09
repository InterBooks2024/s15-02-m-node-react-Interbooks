import { createContext, useContext, useEffect, useState } from "react";


export const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null)
    const [userBooks, setUserBooks] = useState(null)

    const getUserData = async () => {
        //no se de donde sacar este endpoint ni la info de la api
        const RUTA = "https://s15-02-m-node-react-interbooks.onrender.com/api/user/books";
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${tokenJwt}`
                },
              };
            const { data } = await axios.get(RUTA, config);
            setUserData(data)
            setUserBooks(data.books)
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const value = { userData, userBooks, getUserData };
    
    return (
        <UserContext.Provider value={ value }>
            {children}
        </UserContext.Provider>
    )
}
