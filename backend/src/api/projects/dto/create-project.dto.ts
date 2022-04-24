import { IsString } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  readonly name: string
  @IsString()
  readonly description: string
}
