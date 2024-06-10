import React from 'react'
import { Banner, FeaturedBooks } from '../../components'
import { Link } from 'react-router-dom'
import { useBook } from '../../hooks/useBook'


export function Home() {
  const { userBooks, books } = useBook()

  return (
    <main className='container p-2 md:p-10 h-full mt-16 w-full mx-auto'>
        <Link to='/new-book' className="text-end rounded-lg bg-interbook-500 text-white font-bold px-5 py-2 w-fit ms-auto col-span-2">Nuevo libro</Link>
        <Banner/>
        <FeaturedBooks/>
    </main>
  )
}
