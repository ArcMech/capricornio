import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { FormItem } from './forms'
import { addUser } from 'store/users/usersSlice'

export const NewUserForm = () => {
  const dispatch = useDispatch()

  const onSubmit = async (values: any) => {
    try {
      dispatch(addUser({ ...values, role: 'team' }))
    } catch (e: any) {
      console.error(e)
    }
  }
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ first_name: '', last_name: '', email: '', password: '' }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-10 py-8 w-screen max-w-sm">
            <div className="space-y-4">
              <FormItem name="first_name" label="First Name" />
              <FormItem name="last_name" label="Last Name" />
              <FormItem name="email" label="Email" type="email" />
              <FormItem name="password" label="Password" type="password" />
            </div>
            <button
              className="mt-4 w-full bg-pink-700 hover:bg-pink-500 text-white py-2 rounded-md text-lg tracking-wide bottom-10"
              type="submit"
            >
              Add new user
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}
