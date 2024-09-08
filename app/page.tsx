import Link from 'next/link'
import { db } from '@/lib/prisma'

export default async function Home() {
  const posts = await db.post.findMany()

  return (
    <div>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>記事はありません</p>
      )}
    </div>
  )
}
