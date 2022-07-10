export const baseClasses = 'inline-block w-full py-2 pl-8 pr-4 text-xs rounded'

export const sideNavClassNamesFunction = (isActive: boolean) => {
  if (isActive) {
    return `${baseClasses} bg-sky-400 text-white font-bold`
  }
  return `${baseClasses} hover:bg-sky-400 hover:text-white focus-within:text-white`
}
