import { Cards } from "../Cards/Cards"
import { useUserContext } from "../../hooks/useUser";


export const MyLibriary = () => {
    const { userBooks } = useUserContext();
  return (
    <section>
        <button>Agregar Libro</button>
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
