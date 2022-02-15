import { Formik } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { FormItem } from './forms'
import { api } from '../api'
import login from 'src/images/login.jpg'

export const LoginForm = () => {
  const navigate = useNavigate()
  const onSubmit = async (values: { password: string; email: string }) => {
    try {
      const response = await api({
        url: 'http://localhost:8000/api/auth/',
        method: 'POST',
        data: values,
      })
      localStorage.setItem('token', response.data.access_token)
      navigate('/dashboard')
    } catch (e: any) {
      console.error(e)
    }
  }
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-center md:-mb-24 ">
          <Link
            to="/"
            className="p-4 text-xl font-bold text-white bg-blue-400 rounded-md"
          >
            Capricornio
          </Link>
        </div>
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <form
                className="flex flex-col pt-3 md:pt-8 gap-y-3"
                onSubmit={handleSubmit}
              >
                <FormItem label="Email" name="email" />
                <FormItem label="Password" name="password" type="password" />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-400 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 rounded-md"
                >
                  <span className="w-full">Submit</span>
                </button>
              </form>
            )}
          </Formik>
          <div className="pt-12 pb-12 text-center">
            <p>
              Don&#x27;t have an account?{' '}
              <Link to="/register" className="font-semibold underline">
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src={login}
          alt="Mountains"
        />
      </div>
    </div>
  )
}
