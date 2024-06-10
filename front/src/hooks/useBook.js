import { useContext, useEffect, useState } from "react";
import { useUserContext } from "./useUser";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

export const useBook = () => {
  const { tokenJwt, user } = useUserContext();
  const { books, getAllBooks } = useContext(BookContext)
  const userBooks = books.filter((book) => book?.userId === user?.id)


  const navigate = useNavigate()
  const {setUser} = useUserContext()
  const [options, setOptions] = useState({
    genres: [],
    actions: [],
  });

  const [book, setBook] = useState({
    title: "",
    genre: "",
    author: "",
    language: "",
    isbn: "",
    synopsis: "",
    actions: [],
  });

  const [bookImage, setBookImage] = useState(null);

  const handleBookImage = async (event) => {
    setBookImage(event.target.files[0]);
  };
  const handleActions = (ev) => {
    const action = ev.target.value;
    const isChecked = ev.target.checked;

    setBook((prevBook) => {
      if (isChecked) {
        return {
          ...prevBook,
          actions: [...prevBook.actions, action],
        };
      } else {
        return {
          ...prevBook,
          actions: prevBook.actions.filter((act) => act !== action),
        };
      }
    });
  };
  const handleChange = (event) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event, formRef) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("genre", book.genre);
    formData.append("author", book.author);
    formData.append("language", book.language);
    formData.append("isbn", book.isbn);
    formData.append("actions", book.actions.join(","));
    formData.append("synopsis", book.synopsis);
    formData.append("image", bookImage);
    const urlPost = "https://s15-02-m-node-react-interbooks.onrender.com/api/books/post"
    // const urlLocal = 'http://localhost:3001/api/books/post'
    const response = await fetch(
      urlPost,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${tokenJwt}`,
        },
        body: formData,
      }
    );
    if (!response.ok) alert("Error al crear el libro");
    const result = await response.json();
    setUser((prev)=> ({...prev, books: [...prev.books, result.book._id]}))
    alert("Libro creado exitosamente");
    await getAllBooks()
    formRef.current.reset();
    navigate('/')
  };

  const consultaOptions = async () => {
    const response = await fetch(
      "https://s15-02-m-node-react-interbooks.onrender.com/api/books/genres-actions"
    );
    const result = await response.json();
    setOptions(result);
  };

  useEffect(() => {
    consultaOptions();
  }, []);
  return {
    options,
    handleBookImage,
    handleActions,
    handleSubmit,
    handleChange,
    bookImage,
    books,
    userBooks
  };
};
