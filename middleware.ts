import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoutes = createRouteMatcher('/')

export default clerkMiddleware((auth, request) => {
  const { userId, sessionClaims, redirectToSignIn } = auth()

  // 未ログインかつisPublicRoutesの場合はreturn
  if (!userId && isPublicRoutes(request)) return

  // 未ログインかつ非公開ルートへのアクセスはログイン画面にリダイレクト
  if (!userId && !isPublicRoutes(request))
    redirectToSignIn({ returnBackUrl: request.url })

  // ログイン済みかつonboardingCompleteがfalseの場合、/onboardingにリダイレクト
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', request.url)
    return NextResponse.redirect(onboardingUrl)
  }

  // ログイン済かつ非公開ルートにアクセスした場合はそのまま表示する
  if (userId && !isPublicRoutes(request)) return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
