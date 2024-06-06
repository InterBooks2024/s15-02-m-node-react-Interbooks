import { Register } from "../../components"


export const RegisterView = () => {
  return (
    <div className="grid grid-cols-2 place-content-center place-items-center">
        <Register />
        <section className="">
            <img src="/books-reg.svg" alt="books" width={300} height={500} className="w-[500px] h-full"/>
        </section>
    </div>
  )
}
