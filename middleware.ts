import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoutes = createRouteMatcher('/')

export default clerkMiddleware((auth, request) => {
  const { userId, sessionClaims, redirectToSignIn } = auth()

  // 未ログインかつisPublicRoutesの場合はreturn
  if (!userId && isPublicRoutes(request)) return

  // 未ログインかつ非公開ルートへのアクセスはログイン画面にリダイレクト
  if (!userId && !isPublicRoutes(request))
    redirectToSignIn({ returnBackUrl: request.url })
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
