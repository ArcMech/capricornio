import { Project } from 'src/api/projects/entities/project.entity'
import { Avatar } from 'src/api/files/entities/avatar.entity'
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
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

  @JoinColumn()
  @OneToOne(() => Avatar, {
    eager: true,
    nullable: true,
  })
  public avatar?: Avatar | null
}
