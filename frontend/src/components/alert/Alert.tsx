import { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'

export const Alert: React.VFC<{
  message: string | null
  type: 'Info' | 'Error' | 'Warning'
}> = ({ message, type }) => {
  const [visible, setVisible] = useState(false)

  const setOff = () => setVisible(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
    }

    return setOff
  }, [message])

  return (
    <Transition
      show={visible}
      enter="duration-300 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-200 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div
        // onClose={setOff}
        className="bg-red-100 border border-red-400 text-red-700 pl-4 pr-12 py-3 rounded mx-auto fixed top-4 left-0 right-0 w-fit"
        role="alert"
      >
        <strong className="font-bold">{type}:</strong>{' '}
        <span className="block sm:inline">{message}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            className="fill-current h-6 w-6 text-red-500"
            onClick={setOff}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </Transition>
  )
}
