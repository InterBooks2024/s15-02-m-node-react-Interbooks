import { useUserContext } from "../../hooks/useUser";

export const MyWhishlist = () => {
  const {tokenJwt, userId} = useUserContext()
  return (
    <div>MyWhishlist</div>
  )
}
