import { Card } from 'components'
import { Layout } from 'layout'

export const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-4 gap-4 mt-4">
        <Card
          name="Users"
          description="test dsadsaasdsadsadsasdsadsas"
          href="/users"
        />
        <Card
          name="Users"
          description="test dsadsaasdsadsadsasdsadsas"
          href="/users"
        />
        <Card
          name="Users"
          description="test dsadsaasdsadsadsasdsadsas"
          href="/users"
        />
        <Card
          name="Users"
          description="test dsadsaasdsadsadsasdsadsas"
          href="/users"
        />
      </div>
    </Layout>
  )
}
