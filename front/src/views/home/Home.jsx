import React from 'react'
import { Banner, FeaturedBooks } from '../../components'


export function Home() {
  return (
    <main className='container p-2 md:p-10 h-full mt-16'>
        <Banner/>
        <FeaturedBooks/>
    </main>
  )
}
