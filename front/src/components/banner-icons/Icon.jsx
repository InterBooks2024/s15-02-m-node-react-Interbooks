import React from 'react'

export const Icon = ({image, title, classes}) => {
  return (
    <article className={`flex flex-col items-center ${classes}`}>
        <img src={image} alt="regalo" width={64} height={64}/>
        <h3 className="mb-1 text-3xl font-bold tracking-tight text-blue-400">
            {title}
        </h3>
    </article>
  )
}
