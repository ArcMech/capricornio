import { Project } from 'src/api/projects/entities/project.entity'
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  role: 'admin' | 'manager' | 'team' | 'customer'

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }

  @JoinTable()
  @ManyToMany((type) => Project, (user) => user.assigned_users, {
    cascade: true,
  })
  projects: Project[]
}
