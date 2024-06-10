import { BannerIcons } from "../banner-icons/BannerIcons";
import heroBg from "./hero-bg.webp";

export const Banner = () => {
  return (
    <section className="flex flex-col space-y-10">
      <img className="absolute z-0 right-0 top-0 h-full" src={heroBg} alt="Hero image" />
      <div className="z-10">
        <article className="flex flex-col p-2 w-1/2 h-[50dvh]">
          <div className="mt-4 text-start text-bold text-lg leading-relaxed">
            <h2 className="text-4xl text-interbook-400 font-bold line-clamp-2 mb-4 2xl:text-6xl">Intercambia libros,<br /> comparte historias.</h2>
            <h3 className="text-xl text-slate-400 font-semibold line-clamp-4">Conecta con una comunidad apasionada por la lectura, comparte tus libros y descubre nuevas joyas literarias.</h3>
          </div>
        </article>
        <BannerIcons />
      </div>
    </section>
  );
};