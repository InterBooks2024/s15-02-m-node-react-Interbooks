// import arrow from "../../assets/arrow.svg";
import regalo from '../banner-icons/icons/regalo.svg'
import vende from '../banner-icons/icons/vende.svg'
import intercambio from '../banner-icons/icons/intercambio.svg'

export const Cards = ({ title, description, image, author, category, actions }) => {


  return (
    <article className="group cursor-pointer rounded-xl shadow-md hover:shadow-xl lg:hover:scale-105 duration-300 max-w-80 snap-center min-w-48 md:w-48 w-full relative overflow-hidden h-[350px] border-2 flex flex-col justify-start ">
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover w-full h-full z-0 opacity-40 lg:group-hover:opacity-100 duration-300'
                  style={{backgroundImage: `url(${image})`}}></div>
      {/* <img
        className="mx-auto w-full h-36 rounded-lg"
        src={image}
        alt={title}
      /> */}
      <div className="flex flex-col justify-between h-full z-10 lg:group-hover:opacity-0 duration-300"
                  style={{
                    WebkitBackdropFilter: 'blur(10px) saturate(180%)',
                    backdropFilter: 'blur(10px) saturate(180%)',
                    backgroundColor: '#f1fcfb23',
                  }}
      >
        <div className="">
          <h3 className="m-2 mt-4 text-2xl font-bold tracking-tight text-interbook-600">
            {title}
          </h3>
          <h4 className="m-4 text-xl ">{author}</h4>
          <h5>{category}</h5>
        </div>
        <div className="bg-white rounded-xl m-4 py-2 px-4">
          <ul className="flex justify-center space-x-4">
            <li>
                <img className={(actions.indexOf("Intercambio"))+1 ? "" : 'grayscale'} src={intercambio} alt="intercambio" />
            </li>
            <li>
              <img className={(actions.indexOf("Regalo"))+1 ? "" : 'grayscale'} src={regalo} alt="regalo" />
            </li>
            <li>
                <img className={(actions.indexOf("Venta"))+1 ? "" : 'grayscale'} src={vende} alt="vende" />
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};
