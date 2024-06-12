import {vende, intercambio, regalo} from '../'
import { Icon } from './Icon'

export const BannerIcons = () => {
  return (
    <section className='flex gap-5 items-center p-4 justify-center rounded-lg'
    style={{
      WebkitBackdropFilter: 'blur(10px) saturate(180%)',
      backdropFilter: 'blur(10px) saturate(180%)',
      backgroundColor: '#f1fcfb80',
    }}
    >
      <div className='flex-1 bg-white rounded-lg p-4 h-[30dvh]'>
        <Icon title='INTERCAMBIA' image={intercambio} />
        <p className='w-[80%] mx-auto text-slate-500'>Comparte tus libros favoritos y descubre nuevas joyas literarias.</p>
      </div>
      <div className='flex-1 bg-white rounded-lg p-4 h-[30dvh]'>
        <Icon title='REGALA' image={regalo} />
        <p className='w-[80%] mx-auto text-slate-500'>Consigue los mejores libros en nuestra comunidad, muchos usuarios están dispuestos a compartirlos.</p>
      </div>
      <div className='flex-1 bg-white rounded-lg p-4 h-[30dvh]'>
        <Icon title='VENDE' image={vende} />
        <p className='w-[80%] mx-auto text-slate-500'>¿Libros que ya no usas? <br />Muchos usuarios de la comunidad buscan los libros que tu tienes.</p>
      </div>
    </section>
  )
}
