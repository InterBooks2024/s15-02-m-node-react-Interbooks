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
      console.log(action)
        const ENDPOINT = `/exchange/${bookid}`
        const RUTA = `${BASE_URL}${ENDPOINT}`
        const body = {"actions": action}

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
    const getExchangeSent = async () => {
        const ENDPOINT = `/exchanges/sent/`
        const RUTA = `${BASE_URL}${ENDPOINT}`

        try {
          const { data } = await axios.get(RUTA, config)
          return data
        } catch (error) {
          throw new Error(error.message)
        }
    }
    const getExchangeReceived = async () => {
        const ENDPOINT = `/exchanges/received/`
        const RUTA = `${BASE_URL}${ENDPOINT}`

        try {
          const { data } = await axios.get(RUTA, config)
          return data
        } catch (error) {
          throw new Error(error.message)
        }
    }
    const aceptExchangeReceived = async (exchange) => {
      const ENDPOINT = `/exchange/${exchangeId}/reject`
      const RUTA = `${BASE_URL}${ENDPOINT}`

      try {
        const { data } = await axios.patch(RUTA, config)
        return data
      } catch (error) {
        throw new Error(error.message)
      }
    }

    const rejectExchangeReceived = async (exchangeId) => {
      const ENDPOINT = `/exchange/${exchangeId}/reject`
      const RUTA = `${BASE_URL}${ENDPOINT}`

      try {
        const { data } = await axios.patch(RUTA, config)
        return data
      } catch (error) {
        throw new Error(error.message)
      }
    }
    const deleteMadeExchange = async (exchangeId) => {
      const ENDPOINT = `/exchanges/${exchangeId}/cancel`
      const RUTA = `${BASE_URL}${ENDPOINT}`

      try {
        const { data } = await axios.delete(RUTA, config)
        return data
      } catch (error) {
        throw new Error(error.message)
      }
    }


    const value = { generateExchange, 
                    getExchangeSent , 
                    getExchangeReceived , 
                    rejectExchangeReceived , 
                    deleteMadeExchange,
                    aceptExchangeReceived };
    
    return (
        <ExchangesContext.Provider value={ value }>
            {children}
        </ExchangesContext.Provider>
    )
}
