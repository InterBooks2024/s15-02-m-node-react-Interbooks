export function Hero() {
  return (
    <section className="bg-white dark:bg-gray-300">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            El libro que queres a un click de distancia.
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Buscas, Encontras y cambias.
            Asi de facil con Interbook.
          </p>
          
         
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://bimdu.es/wp-content/webpc-passthru.php?src=https://bimdu.es/wp-content/uploads/elementor/thumbs/Bimdu-principal-pjjqoduk4zxnix1fyvwv3jtknghx9p49zqcvvf4wvk.png&nocache=1"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
