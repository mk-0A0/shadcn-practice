import PostForm from '@/app/components/post-form'
import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { authGuard } from '@/app/actions/auth'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '編集',
}

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const authorId = authGuard()
  const post = await db.post.findUnique({
    where: {
      authorId,
      id,
    },
  })
  if (!post) notFound()

  return <PostForm editId={id} />
}
