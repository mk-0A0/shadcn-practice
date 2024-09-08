import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoutes = createRouteMatcher('/')

export default clerkMiddleware((auth, request) => {
  // 未ログインかつisPublicRoutesの場合はreturn
  if (!auth().userId && isPublicRoutes(request)) return

  if (!isPublicRoutes(request)) auth().protect()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
