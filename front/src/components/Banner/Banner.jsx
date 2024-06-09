import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10 mx-auto items-center">
      <Link to='/new-book' className="text-end rounded-lg bg-interbook-500 text-white font-bold px-5 py-2 w-fit ms-auto">Nuevo libro</Link>
      <article className="flex flex-col">
        <div className="flex flex-row justify-center gap-3">
          <div className="">
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#25b7cb"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 20C9.47362 20 7.22075 18.8289 5.75463 17M12 4C14.9611 4 17.5465 5.60879 18.9297 8M4 12C4 9.47362 5.17107 7.22075 7 5.75463M20 12C20 14.8339 18.5265 17.3236 16.3039 18.7448M19.3 5V8H16.3M8 16.3H5V19.3M16.3 16V19H19.3M4.7002 5H7.7002V8"
                  stroke="#0ec0ec"
                  strokeWidth="1.104"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h3 className="mb-1 text-3xl font-bold tracking-tight text-blue-400">
              Intercambia
            </h3>
          </div>
          <div>
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="0.1"
                  d="M4 12.5V16C4 17.8856 4 18.8284 4.58579 19.4142C5.17157 20 6.11438 20 8 20H9H15H16C17.8856 20 18.8284 20 19.4142 19.4142C20 18.8284 20 17.8856 20 16V12.5C20 12.2239 19.7761 12 19.5 12H4.5C4.22386 12 4 12.2239 4 12.5Z"
                  fill="#0ec0ec"
                ></path>{" "}
                <path
                  d="M3 9.5C3 9.03534 3 8.80302 3.03843 8.60982C3.19624 7.81644 3.81644 7.19624 4.60982 7.03843C4.80302 7 5.03534 7 5.5 7H12H18.5C18.9647 7 19.197 7 19.3902 7.03843C20.1836 7.19624 20.8038 7.81644 20.9616 8.60982C21 8.80302 21 9.03534 21 9.5V9.5V9.5C21 9.96466 21 10.197 20.9616 10.3902C20.8038 11.1836 20.1836 11.8038 19.3902 11.9616C19.197 12 18.9647 12 18.5 12H12H5.5C5.03534 12 4.80302 12 4.60982 11.9616C3.81644 11.8038 3.19624 11.1836 3.03843 10.3902C3 10.197 3 9.96466 3 9.5V9.5V9.5Z"
                  stroke="#0ec0ec"
                  strokeWidth="0.264"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M4 12V16C4 17.8856 4 18.8284 4.58579 19.4142C5.17157 20 6.11438 20 8 20H9H15H16C17.8856 20 18.8284 20 19.4142 19.4142C20 18.8284 20 17.8856 20 16V12"
                  stroke="#0ec0ec"
                  strokeWidth="0.264"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M12 7V20"
                  stroke="#0ec0ec"
                  strokeWidth="0.264"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M11.3753 6.21913L9.3959 3.74487C8.65125 2.81406 7.26102 2.73898 6.41813 3.58187C5.1582 4.8418 6.04662 7 7.82843 7L11 7C11.403 7 11.6271 6.53383 11.3753 6.21913Z"
                  stroke="#0ec0ec"
                  strokeWidth="0.264"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M12.6247 6.21913L14.6041 3.74487C15.3488 2.81406 16.739 2.73898 17.5819 3.58187C18.8418 4.8418 17.9534 7 16.1716 7L13 7C12.597 7 12.3729 6.53383 12.6247 6.21913Z"
                  stroke="#0ec0ec"
                  strokeWidth="0.264"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h3 className="mb-1 text-3xl font-bold tracking-tight text-blue-400">
              Regala
            </h3>
          </div>
          <div>
            {" "}
            <svg
              width="64px"
              height="64px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M21 5L19 12H7.37671M20 16H8L6 3H3M13.5 3V9M13.5 3L11.5 5M13.5 3L15.5 5M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                  stroke="#249915"
                  strokeWidth="1.488"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
            <h3 className="mb-1 text-3xl font-bold tracking-tight text-blue-400">
              Vende
            </h3>
          </div>
        </div>
        <div className="mt-4 text-center text-bold text-xl ">
          {" "}
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut fuga
            repellat corrupti! Assumenda impedit iste minima, recusandae earum
            aspernatur veritatis veniam illum distinctio quibusdam quae, cum
            totam corrupti id ipsa tenetur iusto odit! Accusamus inventore in
            nulla. Ducimus sit nisi dolores! Veritatis unde, sequi natus, ullam
            modi earum, voluptatem voluptas molestiae et voluptate id dolorum
            minus fuga autem consequuntur laudantium ratione. In nam repellendus
            tempore maiores quibusdam impedit laudantium consequuntur repellat
            quasi culpa? Quaerat, ipsum!
          </p>
        </div>
      </article>
      <article className="flex justify-center">
        <img src="https://picsum.photos/400/400" alt="Banner" />
      </article>
    </section>
  );
};