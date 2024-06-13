import {vende, intercambio, heart, regalo} from '../'
import { useNavigate } from 'react-router-dom'
import { useExchange } from '../../hooks/useExchange'
import { useState } from 'react'
import { useUserContext } from '../../hooks/useUser'

export const ModalBook = ({setOpenBook, bookData}) => {
    const navigate = useNavigate()
    const {generateExchange} = useExchange()
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useUserContext()

    const handleOnClick = async (book, action) => {
        if(isLoading){ return }
        if(!user){
            navigate('/login')
            return
        }
        // llamar a api de exchange y enviar a mis intercambios
        console.log(book._id, action)
        const exchange = await generateExchange(book._id, action, setIsLoading)
        console.log(exchange)
        if (exchange) {setOpenBook('')}
        navigate('/profile/myexchanges')

    }

    // MANDA DIRECTAMENTE AL WHATSAPP
    // const handleOnClick = (book, action) => {
    //     const user = JSON.parse(localStorage.getItem("user")) || '';
    //     if (!user?.id) {
    //         navigate('/login')
    //         return
    //         } else {
    //             const link = sendMessage({book , action})
    //             window.open(link)
    //             }
    // }
    //             console.log(bookData)
  return (
    <div className="min-h-[100dvh] w-full fixed top-0 left-0 right-0 flex justify-center items-center z-50">  
        <div className='absolute bg-cover bg-interbook-900/40 min-h-[100dvh] w-full top-10 md:top-0 left-0 right-0 backdrop-blur-sm'
        onClick={() => setOpenBook('')}
        >

        </div>
            <article className="rounded-xl w-[95%] xl:w-1/2 text-slate-700 bg-background z-40 h-full p-6 flex flex-col">
                <div className="flex justify-between h-full md:px-10">
                    <div className='flex flex-col items-center'>

                        <img className="object-contain md:object-cover rounded-lg w-full h-56 md:h-80"
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
                    <div className=''>
                        <div className="ml-8">
                            <p>{bookData.user}</p>
                            <p className="text-lg text-wrap">Titulo: <span className="text-interbook-800 text-base 2xl:text-xl font-bold">{bookData.title}</span></p>
                            <p className="text-lg">Autor: <span className="text-interbook-800 text-base 2xl:text-xl font-bold">{bookData.author}</span></p>
                            <p className="text-lg">Género: <span className="text-interbook-800 text-base 2xl:text-xl font-bold">{bookData.genre}</span></p>
                            <p className="text-lg">Idioma: <span className="text-interbook-800 text-base 2xl:text-xl font-bold">{bookData.languague}</span></p>
                            <p className="text-lg">ISBN: <span className="text-interbook-800 text-base 2xl:text-xl font-bold">{bookData.ISBN}</span></p>
                        </div>
                        <div className='ml-8 mt-4 space-y-2'>
                            {bookData.actions.indexOf("Intercambio") != -1 && 
                                <div className='flex gap-2'
                                    onClick={() => handleOnClick(bookData, 'Intercambio', setIsLoading)}
                                >
                                    <img className='w-10' src={intercambio} alt="Intercambiar" />
                                    <div className="w-44 bg-interbook-400 text-white font-bold px-4 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 flex items-center justify-center">
                                        Intercambiar
                                    </div>
                                </div>}
                            {bookData.actions.indexOf("Regalo") != -1 &&
                                <div className='flex gap-2'
                                    onClick={() => handleOnClick(bookData, 'Regalo', setIsLoading)}
                                >
                                    <img className='w-10' src={regalo} alt="Pedir" />
                                    <div className="w-44 bg-interbook-400 text-white font-bold px-4 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 flex items-center justify-center gap-3">
                                        Pedir Regalo 
                                        {/* <img className='w-6' src={whatsapp} alt="" /> */}
                                    </div>
                                </div>
                            }
                            {bookData.actions.indexOf("Venta") != -1 &&
                                <div className='flex gap-2'
                                    onClick={() => handleOnClick(bookData, 'Venta', setIsLoading)}
                                >
                                    <img className='w-10' src={vende} alt="Comprar" />
                                    <div className="w-44 bg-interbook-400 text-white font-bold px-4 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 flex items-center justify-center gap-3">
                                        Comprar
                                        {/* <img className='w-6' src={whatsapp} alt="" /> */}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <p className="text-lg font-medium">Sinopsis:</p>
                    <p className="line-clamp text-lg">{bookData.synopsis}</p>
                </div>
            </article>
    </div>
  )
}
