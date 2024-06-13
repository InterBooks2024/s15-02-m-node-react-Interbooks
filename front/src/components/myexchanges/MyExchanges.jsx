// import { useUserContext } from "../../hooks/useUser";
import { useExchange } from "../../hooks/useExchange";
import { useBook } from "../../hooks/useBook";
import { useEffect, useState } from "react";
import { trash, linkWhatsapp } from "../";

export const MyExchanges = () => {
  // const {tokenJwt, userId} = useUserContext()
  const {getExchangeSent , getExchangeReceived} = useExchange()
  const { books, userBooks  } = useBook()
  const [exchangesSent, setExchangesSent] = useState([])
  const [exchangesReceived, setExchangesReceived] = useState([])
  
  const formatTime = (rawDate) => {
    const date = rawDate.split('T')[0] + ' ' + rawDate.split('T')[1].slice(0, 5)
    return date
  }

  function elegirAlAzar(array) {
    if (array.length === 0) {
        return null
    }
    const indiceAleatorio = Math.floor(Math.random() * array.length)
    return array[indiceAleatorio]
  }
  function actionAlAzar() {
    const opciones = ["Venta", "Intercambio", "Regalo"]
    const indiceAleatorio = Math.floor(Math.random() * opciones.length)
    return opciones[indiceAleatorio]
  }
  const singleBookAttibute = (bookId, attibute) => {
    const book = books.find((book) => book._id === bookId)
    if(attibute == "all"){
      return book}
    else{
      return book[attibute]
    }
  }
  const handleAcept = (action, phoneNumberUserFrom, book, libraryUserFrom) => {
    if(action === "Venta" || action === "Regalo"){
                  // book, action, phoneNumber
      const link = linkWhatsapp(book, action, phoneNumberUserFrom)
      window.open(link, '_blank')
    }
  }
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
    // {
    //   "actions": [],
    //   "bookId": "6667bef0abcaca368079732e",
    //   "createdAt": "2024-06-12T17:16:59.773Z",
    //   "libraryUserFrom": [
    //     "6667b9caabcaca36807972f5",
    //     "6667ba4fabcaca3680797302",
    //     "6667bad8abcaca3680797307",
    //     "6667bba1abcaca368079730c",
    //     "6667bc41abcaca3680797311",
    //     "6667bcd0abcaca3680797316"
    //   ],
    //   "phoneNumberUserFrom": "3518493261",
    //   "status": "pendiente",
    //   "userIdFrom": "6667b95aabcaca36807972f1",
    //   "usernameUserFrom": "Jupiter",
    //   "_id": "6669d80b4f689c7c46990521"
    // }
    <>
    <section>
        <h3 className="text-center text-interbook-600 font-bold">Propuestas recibidas</h3>
        {exchangesReceived.length == 0 && 
          <h4 className="text-center text-interbook-900">Todavía no te han pedido ningún libro</h4>
        }
        {exchangesReceived.length > 0 && (
        <>
          <ul role="list" className="flex flex-col gap-y-3 mt-2">
            {exchangesReceived.map((exchange) => (
              <li key={exchange._id} className="flex justify-between gap-x-6 p-2 rounded-2xl border border-interbook-800/30 shadow-md shadow-interbook-800/30">
                <div className="w-[50%] flex gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={singleBookAttibute(exchange.bookId, "image")} alt="" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{singleBookAttibute(exchange.bookId, "title")}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{singleBookAttibute(exchange.bookId, "author")}</p>
                  </div>
                </div>
                  <div className="w-[15%] items-center">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{exchange.usernameUserFrom}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Intercambio</p>
                  </div>
                  <div className="w-[15%] items-center">
                  <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <p className="text-sm leading-6 text-gray-900">{exchange.status}</p>
                    </div>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{formatTime(exchange.createdAt)}</p>
                  </div>
                  <div className="w-[20%] flex gap-2 items-center justify-end">
                  <button className="px-3 py-1 text-sm font-semibold text-white bg-rose-500 rounded-full hover:bg-red-700">Rechazar</button>
                  <button className="px-3 py-1 text-sm font-semibold text-white bg-emerald-500 rounded-full hover:bg-green-700"
                          onClick={() => handleAcept("Regalo", exchange.phoneNumberUserFrom, singleBookAttibute(exchange.bookId, "all"), exchange.libraryUserFrom)}
                  >
                    Aceptar
                  </button>

                </div>
              </li>
            ))}
          </ul>
        </>
        )}
    </section>
    <section>
    <h3 className="text-center text-interbook-600 font-bold mt-12">¡Quiero estos libros!</h3>
    {/* "_id": "665a060576de73cedbde7695",
    "userIdTo": "66586293889b4ca664d545b9",
    "usernameUserTo": "Agathachristie",
    "status": "pendiente",
    "actions": [],
    "createdAt": "2024-05-31T17:16:53.508Z" */}
    {exchangesSent.length == 0 && 
      <h4 className="text-center text-interbook-900">Todavía no has pedido ningún libro</h4>
    }
{exchangesSent.length > 0 && (
      <>
      <ul role="list" className="flex flex-col gap-y-3 mt-2">

          {exchangesSent.map((exchange) => (
            <li key={exchange._id} className="flex justify-between gap-x-6 p-2 rounded-2xl border border-interbook-800/30 shadow-md shadow-interbook-800/30">
            <div className="w-[50%] flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={singleBookAttibute(exchange.bookId, "image")} alt="" />
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">{singleBookAttibute(exchange.bookId, "title")}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{singleBookAttibute(exchange.bookId, "author")}</p>
              </div>
            </div>
              <div className="w-[20%] items-center">
                <p className="text-sm font-semibold leading-6 text-gray-900">{exchange.usernameUserTo}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Intercambio</p>
              </div>
              <div className="w-[20%] items-center">
              <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <p className="text-sm leading-6 text-gray-900">{exchange.status}</p>
                </div>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{formatTime(exchange.createdAt)}</p>
              </div>
              <div className="w-[10%] flex items-center justify-center cursor-pointer"
              
              >
                <p className="text-sm text-gray-600">Anular</p><img className="w-5 h-5" src={trash} alt="" />
              </div>
          </li>
          ))}
        </ul>
      </>
         )}
    </section>
    </>
  )
}
