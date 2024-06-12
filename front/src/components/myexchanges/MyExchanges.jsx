// import { useUserContext } from "../../hooks/useUser";
import { useExchange } from "../../hooks/useExchange";
import { useEffect, useState } from "react";

export const MyExchanges = () => {
  // const {tokenJwt, userId} = useUserContext()
  const {getExchangeSent , getExchangeReceived} = useExchange()
  const [exchangesSent, setExchangesSent] = useState([])
  const [exchangesReceived, setExchangesReceived] = useState([])
  
  useEffect(() => {
    const fetchExchanges = async () => {
      const fetchSent = await getExchangeSent();
      console.log(fetchSent)
      setExchangesSent(fetchSent);

      const fetchReceived = await getExchangeReceived();
      console.log(fetchReceived)
      setExchangesReceived(fetchReceived);
    };
  
    fetchExchanges();
  }, [])
  
  return (

    // "_id": "665a060576de73cedbde7695",
    // "userIdFrom": "66585c44fb1c4bb8322adb3b",
    // "usernameUserFrom": "JoseHernandez",
    // "libraryUserFrom": [
    //   "665861da889b4ca664d545b4"
    // ],
    // "phoneNumberUserFrom": "3512714562",
    // "status": "pendiente",
    // "actions": [],
    // "createdAt": "2024-05-31T17:16:53.508Z"
        <ul role="list" className="divide-y divide-gray-100">
          {exchangesSent.map((exchange) => (
            <li key={exchange._id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={exchange.userIdFrom} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{exchange.usernameUserFrom}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{exchange.phoneNumberUserFrom}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{exchange.status}</p>
                {exchange.lastSeen ? (
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen <time dateTime={exchange.createdAt}>{exchange.createdAt}</time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
  )
}
