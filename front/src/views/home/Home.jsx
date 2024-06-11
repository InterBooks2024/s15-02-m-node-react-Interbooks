import { Banner, FeaturedBooks } from '../../components'
import { useBook } from '../../hooks/useBook'


export function Home() {
  const { userBooks, books } = useBook()

  return (
    <main className='container p-2 md:p-10 h-full w-full mx-auto'>
        <Banner/>
        <FeaturedBooks books={books}/>
        {/* <FeaturedBooks /> */}
    </main>
  )
}
