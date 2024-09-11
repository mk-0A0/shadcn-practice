import PostForm from '@/app/components/post-form'
import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { authGuard } from '@/app/actions/auth'

export default function Page({ params: { id } }: { params: { id: string } }) {
  const authorId = authGuard()
  const post = db.post.findUnique({
    where: {
      authorId,
      id,
    },
  })

  if (!post) notFound()

  return <PostForm editId={id} />
}
