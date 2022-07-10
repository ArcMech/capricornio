import React from 'react'
import { NavLink } from 'react-router-dom'
import { sideNavClassNamesFunction } from './utils'

type SideLinkProps = {
  icon?: React.ReactElement
  title: string
  to: string
}

export const SideLink: React.VFC<SideLinkProps> = ({
  icon,
  title,
  to = '/',
}) => {
  return (
    <li className="relative">
      <NavLink
        to={to}
        className={({ isActive }) => sideNavClassNamesFunction(isActive)}
      >
        <span>
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <div className="w-4 h-4">{icon}</div>
            </div>
          )}
          {title}
        </span>
      </NavLink>
    </li>
  )
}
