import { Cards } from "../Cards/Cards";

export const FeaturedBooks = () => {
  return (
    <section className="space-y-10 bg-bg-200 rounded-md mx-auto w-full mt-10">
      <article className="flex flex-wrap gap-10 text-sm items-center justify-center mx-auto ">
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
