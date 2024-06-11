import { Cards } from "../Cards/Cards";
export const FeaturedBooks = ({books}) => {
   return (
    <section className="space-y-10 bg-bg-200 rounded-md mx-auto w-full mt-10">
      <h3 className="mt-16 text-2xl font-bold text-interbook-400">DESTACADOS</h3>
      <article className="text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mx-auto">
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
