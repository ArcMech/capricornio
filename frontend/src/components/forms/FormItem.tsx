import { useFormikContext } from 'formik'

export type FormItemProps = {
  name: string
  type?: 'text' | 'email' | 'password' | 'number'
  label: string
}

export const FormItem: React.FC<FormItemProps> = ({
  name,
  type = 'string',
  label,
}) => {
  const { handleChange } = useFormikContext()
  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-gray-600 font-semibold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
      />
    </div>
  )
}
