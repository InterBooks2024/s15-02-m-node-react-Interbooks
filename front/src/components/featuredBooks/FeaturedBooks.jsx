import { Cards } from "../Cards/Cards";

export const FeaturedBooks = () => {
  return (
    <section className="space-y-10 p-10 sm:p-10 bg-bg-200 rounded-md mx-auto">
      <article className="grid grid-cols-1 grid-rows-auto sm:grid-cols-2 lg:grid-cols-5 gap-1 text-sm place-items-center mx-auto">
        <Cards
          title="La Divina comedia"
          image="https://picsum.photos/200/300"
          author="nombre autor"
          category="Comedia"
        />
        <Cards
          title="Harry Potter"
          image="https://picsum.photos/200/300"
          author="nombre autor"
          category="Comedia"
        />
        <Cards
          title="El Psicoanalista"
          image="https://picsum.photos/200/300"
          author="nombre autor"
          category="Comedia"
        />
        <Cards
          title="Mafalda"
          image="https://picsum.photos/200/300"
          author="nombre autor"
          category="Comedia"
        />
        <Cards
          title="El Gran Gatsby"
          image="https://picsum.photos/200/300"
          author="nombre autor"
          category="Comedia"
        />
      </article>
    </section>
  );
};
