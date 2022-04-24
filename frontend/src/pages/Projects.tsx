import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectsSelectors } from 'store/projects'
import { Layout } from 'layout'
import { Card } from 'components'
import { fetchProjectsList } from 'store/projects'

export const Projects = () => {
  const projects = useSelector(projectsSelectors.selectAll)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjectsList())
  }, [])

  return (
    <Layout>
      <div className="grid overflow-hidden grid-cols-3 grid-rows-2 gap-2">
        {projects.map(({ name, id }) => (
          <Card key={id} name={name} description="-" href={`/projects/${id}`} />
        ))}
      </div>
    </Layout>
  )
}
