import React from 'react'
import { Link } from 'react-router-dom'

type CardProps = {
  name: string
  description: string
  href: string
}

export const Card: React.VFC<CardProps> = ({ name, description, href }) => {
  return (
    <Link
      to={href}
      className="bg-white/40 backdrop-blur-md rounded-2xl inset-y-4 ring-1 ring-black/5 px-4 py-4 hover:ring-sky-400"
    >
      <h2 className="tracking-tight font-bold">{name}</h2>
      <p className="font-normal text-gray-700 dark:text-gray-400 text-ellipsis overflow-hidden h-[60px]">
        {description}
      </p>
    </Link>
  )
}
