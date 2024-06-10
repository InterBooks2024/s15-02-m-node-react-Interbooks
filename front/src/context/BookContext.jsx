import { createContext, useEffect, useState } from "react";

export const BookContext = createContext(null)


export const BookProvider = ({children}) => {
    const [books, setBooks] = useState([])
    
    const getAllBooks = async () => {
        const response = await fetch("https://s15-02-m-node-react-interbooks.onrender.com/api/books/get")
        const result = await response.json()
        setBooks(result)
    }

    useEffect(()=>{
        getAllBooks()
    },[])
    
    return (
        <BookContext.Provider value={{
            books,
            getAllBooks
        }}>
            {children}
        </BookContext.Provider>
    )
}