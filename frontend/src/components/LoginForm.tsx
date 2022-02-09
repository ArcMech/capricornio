import { Formik } from 'formik'

export const LoginForm = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex justify-center items-center w-full">
      <Formik
        onSubmit={(values) => console.log(values)}
        initialValues={{ email: '', password: '' }}
      >
        {({ handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
              <div className="space-y-4">
                <div className="p-2 justify-center flex">
                  <img
                    className="rounded-full"
                    src="https://via.placeholder.com/150/"
                  />
                </div>
                <h1 className="text-center text-2xl font-semibold text-gray-600">
                  Login
                </h1>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-gray-600 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-gray-600 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
                  />
                </div>
              </div>
              <button
                className="mt-4 w-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-indigo-100 py-2 rounded-md text-lg tracking-wide"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
