// import arrow from "../../assets/arrow.svg";
import regalo from '../banner-icons/icons/regalo.svg'
import vende from '../banner-icons/icons/vende.svg'
import intercambio from '../banner-icons/icons/intercambio.svg'

export const Cards = ({ title, description, image, author, category }) => {
  return (
    <article className="rounded-xl bg-bg-100 p-3 shadow-md hover:shadow-xl lg:hover:scale-105 duration-300 max-w-80 snap-center min-w-48 md:w-48 w-full relative overflow-hidden h-[350px] border-2 flex flex-col justify-start space-y-2">
      <img
        className="mx-auto w-full h-36 rounded-lg"
        src={image}
        alt={title}
      />
      <div className="flex flex-col justify-between h-full">
        <div className="">
          <a
            href="#"
            className="text-2xl font-bold tracking-tight text-blue-400"
          >
            {title}
          </a>
          <h4 className="text-xl ">{author}</h4>
          <h5>{category}</h5>
        </div>
        <div className="py-2 px-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <a
                href="#"
                className="text-[#39569c] hover:text-gray-900 "
              >
                <img src={intercambio} alt="intercambio" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#00acee] hover:text-gray-900 "
              >
                <img src={regalo} alt="regalo" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-gray-900 "
              >
                <img src={vende} alt="vende" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};
