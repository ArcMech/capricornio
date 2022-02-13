import { useDispatch } from 'react-redux'
import { fetchUsersList } from 'src/store/users/usersSlice'
import { TableAll } from 'src/components'
import { Layout } from 'src/layout'
import { useEffect } from 'react'

export const Dashboard = () => {
  return (
    <Layout>
      <TableAll />
    </Layout>
  )
}
