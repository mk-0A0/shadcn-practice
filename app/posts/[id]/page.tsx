import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from '@/app/onboarding/action'

export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await currentUser()
  const post = await db.post.findUnique({
    where: {
      id,
    },
  })

  if (!post) notFound()

  return (
    <div>
      {post.authorId === user?.id && (
        <Link href={`/posts/${id}/edit`}>編集</Link>
      )}
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    </div>
  )
}
