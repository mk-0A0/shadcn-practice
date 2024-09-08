import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isUnProtectedRoute = createRouteMatcher('/')

export default clerkMiddleware((auth, request) => {
  if (!isUnProtectedRoute(request)) auth().protect()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
