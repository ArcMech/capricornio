import { Roles } from './Roles'

export type User = {
  id: number
  name: string
  first_name: string
  last_name: string
  email: string
  role: Roles
  access_token: string
  avatar: { id: number; url: string; key: string } | null
}
