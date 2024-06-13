import { useEffect, useState } from "react";
import { ModalBook, Cards } from "../";

export const FeaturedBooks = ({books, isUser = false}) => {
    const [parameter, setParameter] = useState('')
    const [openBook, setOpenBook] = useState('');

    useEffect(() => {
      if (!isUser) {
        const userId = JSON.parse(localStorage.getItem("user")) || '';
        setParameter(userId.id);
      }
    }, []);
   return (
    // grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mx-auto 
    <section className="space-y-10 bg-bg-200 rounded-md mx-auto mt-10 min-w-full">
      <article className="text-sm flex flex-wrap justify-center md:justify-start gap-10 mx-auto items-center">
        {books.map((book) => (
          parameter !== book.userId &&
            <Cards
              key={book._id}
              id={book._id}
              title={book.title}
              image={book.image}
              author={book.author}
              category={book.category}
              actions={book.actions}
              isUser={isUser}
              data={book}
              setOpenBook = {setOpenBook}
            />

          ))
          } 
      </article>
      {openBook !== '' && <ModalBook bookData={openBook} setOpenBook={setOpenBook}/>}
    </section>
  );
};
