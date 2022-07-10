import {
  BellIcon,
  CashIcon,
  ChartBarIcon,
  CogIcon,
  ViewGridIcon,
  SupportIcon,
  ViewBoardsIcon,
} from '@heroicons/react/outline'
import { SideLink } from './SideLink'
import { SideSublinks } from './SideSublinks'

/* eslint-disable jsx-a11y/anchor-is-valid */
export const SideNavigation = () => {
  return (
    <div className="w-64 overflow-y-scroll fixed top-24 left-8 bg-white/60 backdrop-blur-md rounded-2xl inset-y-4 ring-1 ring-black/5">
      <div className="px-6 pt-4">
        <ul className="flex flex-col space-y-2">
          <SideLink
            title="Dashboard"
            icon={<ViewBoardsIcon />}
            to="/dashboard"
          />
          <SideSublinks />
          <SideLink to="/sell" title="Market & Sell" icon={<CashIcon />} />
          <SideLink to="/analysis" title="Reporting" icon={<ChartBarIcon />} />
          <SideLink to="/support" title="Support" icon={<SupportIcon />} />
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="px-6 pt-8 ">
          <hr />
        </div>
        <div className="px-6 pt-4 pb-8">
          <ul>
            <SideLink to="/settings" title="Settings" icon={<CogIcon />} />
            <SideLink
              to="/notifications"
              title="Notifications"
              icon={<BellIcon />}
            />
            <SideLink to="/apps" title="Apps" icon={<ViewGridIcon />} />
          </ul>
        </div>
      </div>
    </div>
  )
}
