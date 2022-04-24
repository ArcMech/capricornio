import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from 'src/api/user/entities/user.entity'

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ readonly: true, type: 'timestamptz' })
  created_at: Date

  @Column({ length: 32 })
  name: string

  @Column({ length: 360 })
  description: string

  @ManyToMany((type) => User, (user) => user.projects)
  assigned_users: User[]
}
