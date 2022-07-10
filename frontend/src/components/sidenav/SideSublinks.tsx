import { ChevronDownIcon, DocumentTextIcon } from '@heroicons/react/outline'
import { Disclosure, Transition } from '@headlessui/react'
import { SideLink } from './SideLink'
import { sideNavClassNamesFunction } from './utils'

export const SideSublinks = () => {
  return (
    <li>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="a"
              className={`inline-block relative w-full py-2 pl-8 pr-4 text-xs rounded text-left ${sideNavClassNamesFunction(
                open,
              )}`}
            >
              <span className="flex items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                  <div className="w-4 h-4">
                    <DocumentTextIcon />
                  </div>
                </div>
                Content
                <div
                  className={`w-4 h-4 ${open ? '-rotate-180' : 'rotate-0'} `}
                >
                  <ChevronDownIcon />
                </div>
              </span>
            </Disclosure.Button>
            <Transition
              as="div"
              enter="animate-slide-y"
              enterFrom="max-h-0 opacity-0"
              enterTo="max-h-screen opacity-1"
              leave="animate-slide-y"
              leaveFrom="max-h-screen opacity-1"
              leaveTo="max-h-0 opacity-0"
            >
              <Disclosure.Panel>
                <div className="pt-2 pl-4">
                  <ul className="flex flex-col pl-2 text-gray-500 border-l border-gray-700">
                    <SideLink to="/dashboard/courses" title="Courses" />
                    <SideLink to="/dashboard/categories" title="Categories" />
                    <SideLink to="/dashboard/instructors" title="Instructors" />
                    <SideLink to="/dashboard/video" title="Video Library" />
                  </ul>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </li>
  )
}
