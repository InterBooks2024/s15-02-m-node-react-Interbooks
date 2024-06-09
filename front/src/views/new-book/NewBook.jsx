import { FormAddBook } from "../../components"

export const NewBook = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full mt-20 max-w-6xl mx-auto place-items-center">
        <h1 className="col-span-2 text-center text-3xl mb-5 text-interbook-500">Agrega un nuevo libro</h1>
        <FormAddBook />
        <section className="h-full w-full">
            <img src="/newbook.svg" alt="new book image" height={600} />
        </section>
    </div>
  )
}
