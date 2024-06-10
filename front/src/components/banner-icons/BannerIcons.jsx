import React from 'react'
import regalo from './icons/regalo.svg'
import intercambio from './icons/intercambio.svg'
import vende from './icons/vende.svg'
import { Icon } from './Icon'

export const BannerIcons = () => {
  return (
    <section className='flex gap-5 items-center py-2 justify-center'>
        <Icon title='Regala' image={regalo} />
        <Icon title='Intercambia' image={intercambio} />
        <Icon title='Vende' image={vende} />
    </section>
  )
}
