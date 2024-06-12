import intercambio from '../banner-icons/icons/intercambio.svg'
import regalo from '../banner-icons/icons/regalo.svg'
import vende from '../banner-icons/icons/vende.svg'
import heart from '../banner-icons/icons/heart.svg'
export const EntireBook = ({setOpenBook, bookData}) => {
    console.log(bookData)
  return (
    <div className="min-h-screen w-full fixed top-0 left-0 right-0 flex justify-center items-center">  
        <div className='absolute bg-cover bg-interbook-900/40 min-h-screen w-full top-0 left-0 right-0 backdrop-blur-sm'
        onClick={() => setOpenBook('')}
        >

        </div>
            <article className="rounded-xl xl:w-1/2 text-slate-700 bg-background z-40 h-[80dvh] p-6 flex flex-col">
                <div className="flex gap-8 2xl:gap-16 h-[50dvh]">
                    <div className='w-1/3 flex flex-col items-center'>

                        <img className="object-cover rounded-lg"
                            src={bookData.image}
                            alt={bookData.title}
                        />
                        <div className='flex gap-2 2xl:gap-4 items-center justify-center cursor-pointer group'>
                            <div className="h-auto bg-background text-interbook-500 font-bold py-2 group-hover:underline transition-all duration-300">
                                Añadir a mi WishList
                            </div>
                            <img className='w-8' src={heart} alt="Añadir" />

                        </div>
                    </div>
                    <div className='w-2/3'>
                        <div className="ml-8">
                            <p>{bookData.user}</p>
                            <p className="text-sm text-wrap 2xl:text-xl">Titulo: <span className="text-interbook-800 text-base 2xl:text-3xl font-bold">{bookData.title}</span></p>
                            <p className="text-sm 2xl:text-xl">Autor: <span className="text-interbook-800 text-base 2xl:text-3xl font-bold">{bookData.author}</span></p>
                            <p className="text-sm 2xl:text-xl">Género: <span className="text-interbook-800 text-base 2xl:text-3xl font-bold">{bookData.genre}</span></p>
                            <p className="text-sm 2xl:text-xl">Idioma: <span className="text-interbook-800 text-base 2xl:text-3xl font-bold">{bookData.languague}</span></p>
                            <p className="text-sm 2xl:text-xl">ISBN: <span className="text-interbook-800 text-base 2xl:text-3xl font-bold">{bookData.ISBN}</span></p>
                        </div>
                        <div className='ml-8 mt-4 space-y-2'>
                            {bookData.actions.indexOf("Intercambio") != -1 && <div className='flex gap-2'><img className='w-10' src={intercambio} alt="Intercambiar" /><div className="w-44 bg-interbook-400 text-white font-bold px-4 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 flex items-center justify-center">Intercambiar</div></div>}
                            {bookData.actions.indexOf("Regalo") != -1 && <div className='flex gap-2'><img className='w-10' src={regalo} alt="Pedir" /><div className="w-44 bg-interbook-400 text-white font-bold px-4 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 flex items-center justify-center">Pedir Regalo</div></div>}
                            {bookData.actions.indexOf("Venta") != -1 && <div className='flex gap-2'><img className='w-10' src={vende} alt="Comprar" /><div className="w-44 bg-interbook-400 text-white font-bold px-4 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 flex items-center justify-center">Comprar</div></div>}
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-sm 2xl:text-xl">Sinopsis:</p>
                    <p className="line-clamp-5 2xl:text-3xl">{bookData.synopsis}</p>
                </div>
            </article>
    </div>
  )
}
