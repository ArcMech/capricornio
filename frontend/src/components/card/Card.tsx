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
      className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </Link>
  )
}
