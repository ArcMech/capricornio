import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Avatar } from './entities/avatar.entity'
import { S3 } from 'aws-sdk'
import { ConfigService } from '@nestjs/config'
import { v4 as uuid } from 'uuid'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Avatar)
    private publicFilesRepository: Repository<Avatar>,
    private readonly configService: ConfigService,
  ) {}

  async uploadAvatar(dataBuffer: Buffer, filename: string) {
    const s3 = new S3()
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise()

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    })
    await this.publicFilesRepository.save(newFile)
    return newFile
  }

  async deleteAvatar(fileId: number) {
    const file = await this.publicFilesRepository.findOne({ id: fileId })
    const s3 = new S3()
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: file.key,
      })
      .promise()
    await this.publicFilesRepository.delete(fileId)
  }
}