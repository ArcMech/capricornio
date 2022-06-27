import { Command, Navbar } from 'components'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Command />
      <div className="min-h-full">
        <Navbar />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">{children}</div>
          </div>
        </main>
      </div>
    </>
  )
}
