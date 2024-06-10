import { Cards } from "../Cards/Cards"
import { useUserContext } from "../../hooks/useUser";
import { Link } from "react-router-dom";



export const MyLibrary = () => {
    const {tokenJwt, userId, userBooks} = useUserContext()
  return (
    <section>
      <Link to='/new-book' className="text-end rounded-lg bg-interbook-500 text-white font-bold px-5 py-2 w-fit ms-auto">Nuevo libro</Link>
      {!userBooks && <p>No tienes libros agregados</p>}
        {userBooks && 
            userBooks.map(libro => <Cards
                key= {libro._id}
                title= {libro.title}
                author= {libro.author}
                image= {libro.image}
                category= {libro.category}
              />)
        }
    </section>
  )
}
