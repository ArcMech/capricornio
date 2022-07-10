import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { logout } from 'store/users'
import { useUser } from 'hooks'
import logo from 'assets/logo.svg'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Users', href: '/users' },
  { name: 'Projects', href: '/projects' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Navbar = () => {
  const dispatch = useDispatch()

  const { pathname } = useLocation()

  const user = useUser()

  const logoutFc = () => {
    dispatch(logout())
  }

  const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
    { name: 'Settings', to: '/settings' },
    { name: 'Sign out', to: '/login', onClick: logoutFc },
  ]
  return (
    <Disclosure
      as="nav"
      className="bg-white/40 backdrop-blur-md rounded-2xl inset-y-4 mx-8 sticky ring-1 ring-black/5 z-50"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 ">
                  <img className="h-8 w-8" src={logo} alt="Workflow" />
                </div>
                <div className="hidden md:block ">
                  <div className="ml-10 flex items-baseline space-x-4 ">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.href === pathname
                            ? 'bg-sky-400 text-white '
                            : 'text-sky-900 hover:text-sky-600 ',
                          'px-4 py-2 rounded text-sm font-bold',
                        )}
                        aria-current={
                          item.href === pathname ? 'page' : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-sky-700 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 hover:ring-2 hover:ring-sky-400">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user?.avatar?.url || ''}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name} onClick={item?.onClick}>
                            {({ active }) => (
                              <Link
                                to={item.to}
                                className={classNames(
                                  active ? 'bg-sky-100' : '',
                                  'block px-4 py-2 text-sm text-sky-900',
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className=" inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.href === pathname
                      ? 'bg-sky-400 text-white'
                      : 'text-sky-300 hover:bg-sky-400 hover:text-white',
                    'block px-3 py-2 rounded text-base font-medium',
                  )}
                  aria-current={item.href === pathname ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-sky-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user?.avatar?.url}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-sm font-medium leading-none text-sky-400">
                    {user?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.to}
                    className="block px-3 py-2 rounded text-base font-medium text-sky-400 hover:text-white hover:bg-sky-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
