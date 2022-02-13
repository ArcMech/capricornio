import { useDispatch } from 'react-redux'
import { fetchUsersList } from 'src/store/users/usersSlice'
import { Table } from 'src/components'
import { Layout } from 'src/layout'
import { useEffect } from 'react'

export const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsersList())
  }, [])

  return (
    <Layout>
      <Table />
    </Layout>
  )
}
