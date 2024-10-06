import PostForm from '@/app/components/post-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '新規作成',
}
export default function Page() {
  return <PostForm />
}
