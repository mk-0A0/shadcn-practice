import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from '@/app/onboarding/action'
import { Metadata, ResolvingMetadata } from 'next'
import { getPost } from '@/app/components/post-form/action'

type Props = {
  params: { id: string }
}

export const generateMetadata = async (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const doc = await getPost(params.id)
  const parentMeta = await parent

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: parentMeta.description,
    openGraph: {
      ...parentMeta.openGraph,
      title: doc.title,
      description: parentMeta.description || '',
      // TODO 型エラー解消する
      //  TS2322: Type "article" is not assignable to type "video.other"
      // @ts-ignore
      type: 'article',
    },
  }
}

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
