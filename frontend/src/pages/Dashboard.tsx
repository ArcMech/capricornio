import { TableAll, Modal } from 'components'
import { Layout } from 'layout'

export const Dashboard = () => {
  return (
    <Layout>
      <Modal visible content="dupa" title="henlo" />
      <TableAll />
    </Layout>
  )
}
