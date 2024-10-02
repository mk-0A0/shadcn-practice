'use server'

import { z } from 'zod'
import { authGuard } from '@/app/actions/auth'
import { randomUUID } from 'node:crypto'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const PrismaSchema = z.object({
  body: z.string().max(140),
  title: z.string().max(140),
})

export const createPost = async (formData: FormData) => {
  const authorId = authGuard()
  const id = randomUUID()

  const validatedData = PrismaSchema.parse({
    body: formData.get('body'),
    title: formData.get('title'),
  })
  const newData: Prisma.PostUncheckedCreateInput = {
    authorId,
    id,
    ...validatedData,
  }

  // TODO: 以下のエラーを解消する
  //  Error: The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received undefined
  // const thumbnailDataURL = formData.get('thumbnail') as string
  // if (thumbnailDataURL) {
  //   newData.thumbnailURL = await putImage(
  //     thumbnailDataURL,
  //     `posts/${id}/thumbnail.png`
  //   )
  // }

  await db.post.create({
    data: newData,
  })
  revalidatePath('/')
  redirect('/')
}

export const updatePost = async (id: string, formData: FormData) => {
  const authorId = authGuard()
  const validationData = PrismaSchema.parse({
    title: formData.get('title'),
    body: formData.get('body'),
  })
  const newData: Prisma.PostUncheckedUpdateInput = {
    ...validationData,
  }

  await db.post.update({
    where: {
      authorId,
      id,
    },
    data: newData,
  })

  revalidatePath('/')
  redirect(`/posts/${id}`)
}

export const deletePost = async (id: string) => {
  const authorId = authGuard()

  await db.post.delete({
    where: {
      authorId,
      id,
    },
  })

  revalidatePath('/')
  redirect('/')
}

// 記事を取得
export const getOwnPost = async (id: string) => {
  const authorId = authGuard()
  return db.post.findUnique({
    where: {
      authorId,
      id,
    },
  })
}
