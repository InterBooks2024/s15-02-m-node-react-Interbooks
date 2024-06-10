import { useUserContext } from "../../hooks/useUser";

export const MyExchanges = () => {
  const {tokenJwt, userId} = useUserContext()
  return (
    <div>MyExchanges</div>
  )
}
