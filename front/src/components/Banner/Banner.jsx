import { Link } from "react-router-dom";
import { BannerIcons } from "../banner-icons/BannerIcons";

export const Banner = () => {
  return (
    <section className="flex flex-col space-y-10">
      <BannerIcons />
      <div className="flex flex-col md:flex-row gap-10 mx-auto items-center max-w-6xl">
        <article className="flex flex-col p-2 w-1/2">
          <div className="mt-4 text-start text-bold text-lg leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut fuga
              repellat corrupti! Assumenda impedit iste minima, recusandae earum
              aspernatur veritatis veniam illum distinctio quibusdam quae, cum
              totam corrupti id ipsa tenetur iusto odit! Accusamus inventore in
              nulla. Ducimus sit nisi dolores! Veritatis unde, sequi natus, ullam
              modi earum, voluptatem voluptas molestiae et voluptate id dolorum
              minus fuga autem consequuntur laudantium ratione!
            </p>
          </div>
        </article>
        <article className="flex justify-center rounded-xl w-1/2">
          <img src="https://picsum.photos/400/400" alt="Banner" className="object-cover rounded-xl w-80" />
        </article>
      </div>
    </section>
  );
};