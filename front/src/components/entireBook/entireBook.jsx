export const entireBook = (setOpenBook, bookData) => {
    // esto iria en home
    // const [openBook, setOpenBook] = useState(false);
    // <div className={`${!openBook && "hidden"
  return (
    <>  
        <div className='bg-cover bg-interbook-900/40 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm'
        onClick={() => setOpenBook(false)}
        ></div>
        <article className="rounded-xl xl:w-1/2 text-slate-700 bg-background">
            <div>
                <img
                    className="h-1/2 aspect-[3/2] rounded-lg"
                    src={bookData.image}
                    alt={bookData.title}
                />
                <p>´{bookData.user}´</p>
                <div>
                    <p><span className="text-semibold">Titulo: </span>´{bookData.title}´</p>
                    <p><span className="text-semibold">Autor: </span>´{bookData.author}´</p>
                    <p><span className="text-semibold">Idioma: </span>´{bookData.language}´</p>
                    <p><span className="text-semibold">ISBN: </span>´{bookData.ISBN}´</p>
                </div>
            </div>
            <div>
                <p className="text-semibold">Sinopsis:</p>
                <p>´{bookData.sinopsis}´</p>
            </div>
            <footer>
                {/* botones */}
            </footer>

        </article>
    </>
  )
}
