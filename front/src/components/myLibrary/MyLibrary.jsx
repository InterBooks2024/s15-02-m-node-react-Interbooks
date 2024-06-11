// import { Cards } from "../Cards/Cards"
import { useBook } from "../../hooks/useBook";
import { Link } from "react-router-dom";
import { FeaturedBooks } from "../featuredBooks/FeaturedBooks";


export const MyLibrary = () => {
    const {userBooks} = useBook()
    console.log({userBooks})
  return (
    <section>
      <div className="mt-4 flex justify-between">
        <h3 className="text-2xl font-bold text-interbook-400">Mis Libros</h3>
        <Link to='/new-book' className="text-end rounded-lg bg-interbook-500 text-white font-bold px-5 py-2 w-fit ms-auto">Nuevo libro</Link>
      </div>
      {!userBooks && <p>No tienes libros agregados</p>}
      {userBooks && 
          <FeaturedBooks books = {userBooks} isUser = {true}/>
      }
    </section>
  )
}
