import { User } from './User'

export type Project = {
  id: number
  created_at: string
  description: string
  name: string
  assigned_users: User[]
}
