import {intercambio} from '../banner-icons/icons/intercambio.svg'
import {regalo} from '../banner-icons/icons/regalo.svg'
import {vende} from '../banner-icons/icons/vende.svg'
import {heart} from '../banner-icons/icons/heart.svg'
export const EntireBook = ({setOpenBook, bookData}) => {
    console.log(bookData)
  return (
    <div className="min-h-screen w-full fixed top-0 left-0 right-0 flex justify-center items-center">  
        <div className='absolute bg-cover bg-interbook-900/40 min-h-screen w-full top-0 left-0 right-0 backdrop-blur-sm'
        onClick={() => setOpenBook('')}
        >

        </div>
            <article className="rounded-xl xl:w-1/2 text-slate-700 bg-background z-40 h-[80dvh] p-6 flex flex-col space-y-4">
                <div className="flex h-[50dvh]">
                    <img className="h-full w-1/3 object-cover rounded-lg"
                        src={bookData.image}
                        alt={bookData.title}
                    />
                    <p>{bookData.user}</p>
                    <div className="ml-8">
                        <p className="text-sm text-wrap">Titulo: <span className="text-interbook-800 text-base font-bold">{bookData.title}</span></p>
                        <p className="text-sm">Autor: <span className="text-interbook-800 text-base font-bold">{bookData.author}</span></p>
                        <p className="text-sm">Género: <span className="text-interbook-800 text-base font-bold">{bookData.genre}</span></p>
                        <p className="text-sm">Idioma: <span className="text-interbook-800 text-base font-bold">{bookData.languague}</span></p>
                        <p className="text-sm">ISBN: <span className="text-interbook-800 text-base font-bold">{bookData.ISBN}</span></p>
                        <div className="bg-interbook-400 text-white font-bold px-4 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500">Intercambiar</div><img src={intercambio} alt="Intercambiar" />
                        <div className="bg-interbook-400 text-white font-bold px-4 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500">Pedir Regalo</div><img src={regalo} alt="Pedir" />
                        <div className="bg-interbook-400 text-white font-bold px-4 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500">Comprar</div><img src={vende} alt="Comprar" />
                        <div className="bg-interbook-400 text-white font-bold px-4 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500">Añadir a mi WishList</div><img src={heart} alt="Añadir" />
                    </div>
                </div>
                <div>
                    <p className="text-semibold">Sinopsis:</p>
                    <p className="line-clamp-5">{bookData.synopsis}</p>
                </div>
                <footer>
                    {/* botones */}
                </footer>

            </article>
    </div>
  )
}
