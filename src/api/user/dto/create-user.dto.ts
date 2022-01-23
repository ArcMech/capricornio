import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsString()
  readonly email: string;

  @IsString({ each: true })
  readonly role: 'Admin' | 'Manager' | 'Team' | 'Customer';
}
