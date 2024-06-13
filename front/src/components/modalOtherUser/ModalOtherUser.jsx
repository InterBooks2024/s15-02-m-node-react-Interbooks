import { Cards2 } from "../"
import { useBook } from '../../hooks/useBook'
import { useExchange } from '../../hooks/useExchange'
import { linkWhatsapp } from "../"
import { useState } from "react"

export const ModalOtherUser = ({data, setOpen, book}) => {
  const { books } = useBook()
  const { aceptExchangeReceived } = useExchange()
  const [isLoading, setIsLoading] = useState(false)
  const handleAcept = async (exchange) => {
    setIsLoading(true)
    const rta = await aceptExchangeReceived(exchange)
    console.log(rta)
    const link = linkWhatsapp(book, exchange.actions[0], exchange.phoneNumberUserFrom)
    window.open(link, '_blank')
  }
  const userBooks = [];
  data.libraryUserFrom.forEach(id => {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
      userBooks.push(books[bookIndex]);
    }
  });
  console.log('userBooks', userBooks)
  console.log('data.libraryUserFrom', books)
  console.log('book', book)

  // console.log(data)
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
  //   "_id": "6669d80b4f689c7c46990521",
  //   "prototype": "Object"
  return (
    <div className="min-h-screen w-full fixed top-0 left-0 right-0 flex justify-center items-center">  
        <div className='absolute bg-cover bg-interbook-900/40 min-h-screen w-full top-0 left-0 right-0 backdrop-blur-sm'
        onClick={() => setOpen(false)}
        >
        </div>
        <article className="rounded-xl xl:w-1/2 text-slate-700 bg-background z-40 h-[70dvh] p-6 flex flex-col">
            <h3 className="text-interbook-800">Biblioteca de <span className="font-bold text-interbook-400">{data.usernameUserFrom}</span></h3>
            <h3>Elige uno de sus libros!</h3>
            <article className="text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mx-auto">
        {userBooks.map((book) => (
            <Cards2
              key={book._id}
              id={book._id}
              title={book.title}
              image={book.image}
              author={book.author}
              category={book.category}
              actions={book.actions}
              data={book}
            />

          ))
          } 
      </article>
            <button className="w-32 px-3 py-1 text-sm font-semibold text-white bg-emerald-500 rounded-full hover:bg-green-700"
              onClick={() => handleAcept(data)}
              disabled={isLoading}
            >
              Elegir
            </button>
        </article>
</div>
  )
}
