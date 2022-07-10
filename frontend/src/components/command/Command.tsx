import { Fragment, useEffect, useState } from 'react'
import { Dialog, Combobox, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'

export const Command = () => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const onKeydown = (evt: KeyboardEvent) => {
      if ((evt.key === 'k' && evt.metaKey) || evt.ctrlKey) {
        setOpen(!open)
      }
    }

    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [open])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto z-50"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 overflow-hidden"
            onChange={() => {}}
            value=""
          >
            <div className="flex items-center px-4 py-2">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                className="w-full border-0 bg-transparent focus:ring-0 text-sm text-gray-800 placeholder-gray-400"
                placeholder="Search..."
                onChange={() => {}}
                value=""
              />
            </div>
            <Combobox.Options
              static
              className="py-4 text-sm max-h-96 overflow-y-auto"
            >
              <Combobox.Option value="Project 1">
                {({ active }) => (
                  <div
                    className={`px-4 py-2 space-x-1 ${
                      active ? 'bg-sky-400' : 'bg-white'
                    }`}
                  >
                    <span
                      className={`font-medium  ${
                        active ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Project
                    </span>
                    <span
                      className={`${active ? 'text-sky-100' : 'text-gray-400'}`}
                    >
                      in here
                    </span>
                  </div>
                )}
              </Combobox.Option>
              <Combobox.Option value="Project 2">
                {({ active }) => (
                  <div
                    className={`px-4 py-2 space-x-1 ${
                      active ? 'bg-sky-400' : 'bg-white'
                    }`}
                  >
                    <span
                      className={`font-medium  ${
                        active ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Project
                    </span>
                    <span
                      className={`${active ? 'text-sky-100' : 'text-gray-400'}`}
                    >
                      in here
                    </span>
                  </div>
                )}
              </Combobox.Option>
              <Combobox.Option value="Project 3">
                {({ active }) => (
                  <div
                    className={`px-4 py-2 space-x-1 ${
                      active ? 'bg-sky-400' : 'bg-white'
                    }`}
                  >
                    <span
                      className={`font-medium  ${
                        active ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      Project
                    </span>
                    <span
                      className={`${active ? 'text-sky-100' : 'text-gray-400'}`}
                    >
                      in here
                    </span>
                  </div>
                )}
              </Combobox.Option>
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
