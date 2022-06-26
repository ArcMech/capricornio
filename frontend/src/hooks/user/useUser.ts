import { useSelector } from 'react-redux'
import { userSelector } from 'store/users'

export const useUser = () => {
  return useSelector(userSelector)
}
