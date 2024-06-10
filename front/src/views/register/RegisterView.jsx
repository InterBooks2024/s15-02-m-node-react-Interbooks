import { Register } from "../../components"


export const RegisterView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center p-2">
        <Register />
        <section className="">
            <img src="/books-reg.svg" alt="books" width={300} height={500} className="w-[700px] h-full object-cover"/>
        </section>
    </div>
  )
}
