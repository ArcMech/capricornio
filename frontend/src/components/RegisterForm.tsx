import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FormItem } from './forms'
import { addUser } from 'store/users/usersSlice'
import loginImage from 'images/login.jpg'

export const RegisterForm = () => {
  const dispatch = useDispatch()
  const onSubmit = async (values: {
    first_name: string
    last_name: string
    password: string
    email: string
  }) => {
    try {
      dispatch(addUser({ ...values, role: 'team' }))
    } catch (e: any) {
      console.error(e)
    }
  }
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-12 lg:px-32">
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              password: '',
            }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => (
              <form
                className="flex flex-col pt-3 md:pt-8 gap-y-3"
                onSubmit={handleSubmit}
              >
                <FormItem label="First name" name="first_name" />
                <FormItem label="Last name" name="last_name" />
                <FormItem label="Email" name="email" />
                <FormItem label="Password" name="password" type="password" />
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-blue-400 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 rounded-md"
                >
                  <span className="w-full">Register</span>
                </button>
              </form>
            )}
          </Formik>
          <div className="pt-12 pb-12 text-center">
            <p>
              {'Have an account? '}
              <Link to="/login" className="font-semibold underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl">
        <img
          className="hidden object-cover w-full h-screen md:block"
          src={loginImage}
          alt="Mountains"
        />
      </div>
    </div>
  )
}
