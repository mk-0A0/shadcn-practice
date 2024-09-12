import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'
import { dataURLtoBuffer } from '@/lib/utils'

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_ENDPOINT as string,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY as string,
  },
})

export const putImage = async (dataUrl: string, pathname: string) => {
  const file = dataURLtoBuffer(dataUrl)

  const uploadParams: PutObjectCommandInput = {
    Bucket: 'mk-00',
    Key: pathname,
    Body: file,
    ContentType: 'image/png',
    ACL: 'public-read',
  }
  const command = new PutObjectCommand(uploadParams)
  await client.send(command)

  return `${process.env.IMAGE_HOST_URL}/${pathname}`
}

export const deleteImage = async (pathname: string) => {
  const uploadParams: DeleteObjectCommandInput = {
    Bucket: 'mk-00',
    Key: pathname,
  }
  const command = new DeleteObjectCommand(uploadParams)
  return client.send(command)
}
