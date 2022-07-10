import { Command, Navbar, SideNavigation } from 'components'

export const Layout: React.FC<{ title?: string }> = ({ children, title }) => {
  return (
    <>
      <Command />
      <div className="min-h-[200vh] bg-blue-100 relative">
        <Navbar />
        <div className="flex">
          <div className="flex-none w-64">
            <SideNavigation />
          </div>
          <main className="inset-y-4 relative min-h-[80vh] px-8 flex-auto">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="">
                <h1>{title}</h1>
                <hr />
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
