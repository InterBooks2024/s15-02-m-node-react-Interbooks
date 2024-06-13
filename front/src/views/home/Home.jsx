import { Banner, FeaturedBooks } from '../../components'
import { useBook } from '../../hooks/useBook'


export function Home() {
  const { books } = useBook()

  return (
    <main className='container p-2 md:p-10 h-full w-full mx-auto'>
        <Banner/>
        <h3 className="mt-16 text-2xl font-bold text-interbook-400">DESTACADOS</h3>
        <FeaturedBooks books={books}/>
        {/* <FeaturedBooks /> */}
    </main>
  )
}
