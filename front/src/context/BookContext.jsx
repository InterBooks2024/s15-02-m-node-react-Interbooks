import { createContext } from "react";

export const BookContext = createContext(null)


export const BookProvider = ({children}) => {
    
    return (
        <BookContext.Provider value={{}}>
            {children}
        </BookContext.Provider>
    )
}