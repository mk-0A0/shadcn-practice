import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoutes = createRouteMatcher('/')

export default clerkMiddleware((auth, request) => {
  // 未ログインかつisPublicRoutesの場合はreturn
  if (!auth().userId && isPublicRoutes(request)) return

  // 未ログインかつ非公開ルートへのアクセスはログイン画面にリダイレクト
  if (!auth().userId && !isPublicRoutes(request))
    auth().redirectToSignIn({ returnBackUrl: request.url })
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
