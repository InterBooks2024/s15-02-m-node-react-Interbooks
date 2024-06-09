import { useRef } from "react";
import { useBook } from "../../hooks/useBook";

export const FormAddBook = ({ style }) => {
  const formRef = useRef();

  const { handleSubmit, handleBookImage, handleActions, handleChange, options, book, bookImage } = useBook()
  

  return (
    <form
      onSubmit={(ev)=> handleSubmit(ev, formRef)}
      className="flex flex-col rounded-md gap-3 max-w-md px-5 md:p-x10"
      style={style}
      ref={formRef}
    >
      <div>
        <label htmlFor="title">
          Titulo<span>*</span>
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          id="title"
          className="my-2 py-3 px-5 w-full outline-none border-2 border-zinc-400 rounded-3xl text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300"
        />
      </div>
      <div>
        <label htmlFor="author">
          Autor<span>*</span>
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="author"
          id="author"
          className="my-2 py-3 px-5 w-full outline-none border-2 border-zinc-400 rounded-3xl text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300"
        />
      </div>
      <div className="flex items-center justify-center gap-10">
        <div>
          <label htmlFor="genre">
            Género<span>*</span>
          </label>
          <select
            name="genre"
            id="genre"
            onChange={handleChange}
            className="my-2 px-5 w-full outline-none border-2 border-zinc-400 rounded-3xl text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300"
          >
            <option value="">- Seleccione -</option>
            {options.genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="language">
            Idioma<span>*</span>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="language"
            id="language"
            className="my-2 py-3 px-5 w-full outline-none border-2 border-zinc-400 rounded-3xl text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300"
          />
        </div>
      </div>
      <div>
        <label htmlFor="isbn">ISBN</label>
        <input
          onChange={handleChange}
          type="text"
          name="isbn"
          id="isbn"
          className="my-2 py-3 px-5 w-full outline-none border-2 border-zinc-400 rounded-3xl text-base focus:border-cyan-400  text-zinc-600 h-10 placeholder:text-zinc-300"
        />
      </div>
      <div>
        <label htmlFor="synopsis">Sinopsis</label>
        <textarea
          onChange={handleChange}
          name="synopsis"
          id="synopsis"
          cols={30}
          rows={5}
          style={{ resize: "none" }}
          className="border-2 rounded-lg w-full border-zinc-400 px-5 py-2"
        />
      </div>
      <div className="">
        <label htmlFor="actions">Disponible para: </label>
        <div className="flex gap-5 items-center mx-auto justify-center my-2">
          {options?.actions?.map((action) => (
            <label key={action} htmlFor={action} className="flex items-center">
              <input
                type="checkbox"
                onChange={handleActions}
                name="actions"
                checked={book?.actions.includes(action)}
                value={action}
                id={action}
                className="mr-2 accent-interbook-400"
              />
              {action}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label
          htmlFor="image"
          className="cursor-pointer block text-center border-2 border-black p-3 max-w-48 mx-auto"
        >
          {" "}
          Imagen del libro<span>*</span>
        </label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleBookImage}
          style={{ display: "none" }}
        />
        {bookImage && (
          <img
            src={bookImage ? URL.createObjectURL(bookImage) : ""}
            alt="bookImage"
            width={150}
            height={200}
            className="mt-2 mx-auto border-4 border-interbook-400 rounded-3xl p-2"
          />
        )}
      </div>
      <input
        type="submit"
        value="Agregar Libro"
        className="bg-interbook-400 w-full max-w-48 flex justify-center items-center text-white font-bold md:px-2 py-2 rounded-full cursor-pointer focus:outline-none focus:ring-2 hover:bg-interbook-500 mx-auto mt-5"
      />
    </form>
  );
};
