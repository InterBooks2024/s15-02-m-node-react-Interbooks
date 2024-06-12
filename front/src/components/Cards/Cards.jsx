// import arrow from "../../assets/arrow.svg";
import regalo from '../banner-icons/icons/regalo.svg'
import vende from '../banner-icons/icons/vende.svg'
import intercambio from '../banner-icons/icons/intercambio.svg'
import heart from '../banner-icons/icons/heart.svg'
import { useState } from 'react';

export const Cards = ({ title, synopsis, image, author, category, actions, whishlist=false, isUser , data, setOpenBook}) => {
// text-transdorm

    function formatString(str) {
      return str
        .toLowerCase()
        .split(' ') 
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(' ');
    }
    const [myWhishlist, setMyWhishlist] = useState(whishlist)

  return (
    <article className="group cursor-pointer rounded-xl shadow-interbook-900/40 shadow-lg hover:shadow-2xl lg:hover:scale-105 duration-300 max-w-80 snap-center min-w-48 md:w-48 w-full relative overflow-hidden h-[350px] border-2 flex flex-col justify-start ">
      {/* <div className='abosolute top-0 left-0 bg-interbook-100/20 z-20 w-full h-full'>
        <p>{formatString(title)}</p>
        <p className='truncate'>{synopsis}</p>
      </div> */}
      <div className="flex flex-col justify-between h-full duration-300 relative"
            style={{
              WebkitBackdropFilter: 'blur(10px) saturate(180%)',
              backdropFilter: 'blur(10px) saturate(180%)',
              backgroundColor: '#f1fcfb23',
              }}
            onClick={() => setOpenBook(data)}
      >
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-center bg-cover w-full h-full z-0 duration-300'
                    style={{backgroundImage: `url(${image})`}}>
            {!isUser && 
            <div style={{borderRadius: "64% 0% 0% 0% / 64% 10% 10% 0%"}} className='absolute right-0 bottom-0 z-20 bg-background/30 p-3 pb-2 pr-2'>
              <img className={` hover:scale-120 drop-shadow-lg drop-shadow-white ${myWhishlist ? '' : 'grayscale'}`}
                    src={heart} alt="Agregar a wishlist" width='32'
                    onClick={() => {setMyWhishlist(!myWhishlist)}}
              />

            </div>
            }
        </div>
        <div className="bg-white rounded-xl m-4 py-2 px-4 z-10 shadow-md shadow-interbook-900/50" onClick={() => setOpenBook(data)}>
          <ul className="flex justify-center space-x-4">
            <li>
                  <img className={(actions.indexOf("Intercambio"))+1 ? "scale-110" : 'grayscale scale-75'} src={intercambio} alt="intercambio" />
            </li>
            <li>
                  <img className={(actions.indexOf("Regalo"))+1 ? "scale-110" : 'grayscale scale-75'} src={regalo} alt="regalo" />
            </li>
            <li>
                  <img className={(actions.indexOf("Venta"))+1 ? "scale-110" : 'grayscale scale-75'} src={vende} alt="vende" />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center p-2" onClick={() => setOpenBook(data)}>
        <h3 className="font-bold tracking-tight text-interbook-600">
          {formatString(title)}
        </h3>
        <h4 className="">{formatString(author)}</h4>
        <h5>{category}</h5>
      </div>
    </article>
  );
};
