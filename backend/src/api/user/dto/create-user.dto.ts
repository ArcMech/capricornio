import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsNumber,
  IsJSON,
} from 'class-validator'
import { Avatar } from 'src/api/files/entities/avatar.entity'

export class CreateUserDto {
  @IsString()
  readonly first_name: string

  @IsString()
  readonly last_name: string

  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(8)
  readonly password: string

  @IsString({ each: true })
  readonly role: 'admin' | 'manager' | 'team' | 'customer'

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly projects: number[]

  @IsOptional()
  @IsJSON()
  readonly avatar: Avatar | null
}
