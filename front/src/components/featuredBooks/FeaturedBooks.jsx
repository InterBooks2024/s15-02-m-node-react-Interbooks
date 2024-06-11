import { Cards } from "../Cards/Cards";
import { useBook } from '../../hooks/useBook'
export const FeaturedBooks = () => {
  const { books } = useBook()
  console.log(books)
  return (
    <section className="space-y-10 bg-bg-200 rounded-md mx-auto w-full mt-10">
      <h3 className="mt-16 text-2xl font-bold text-interbook-400">DESTACADOS</h3>
      <article className="flex flex-wrap gap-10 text-sm items-center justify-center mx-auto ">
        {books.map((book) => (
          <Cards
            key={book._id}
            id={book._id}
            title={book.title}
            image={book.image}
            author={book.author}
            category={book.category}
            actions={book.actions}
          />

        ))
        }
      </article>
    </section>
  );
};
