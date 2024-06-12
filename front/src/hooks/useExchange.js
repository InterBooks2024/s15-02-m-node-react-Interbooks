import { useContext } from "react"
import { ExchangesContext } from "../context/ExchangesContext"

export const useExchange = () => {
    return useContext(ExchangesContext)
}