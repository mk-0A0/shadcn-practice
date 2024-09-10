import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoutes = createRouteMatcher('/')
const isOnboardingRoutes = createRouteMatcher('/onboarding')

export default clerkMiddleware((auth, request) => {
  const { userId, sessionClaims, redirectToSignIn } = auth()

  // ログイン済みかつ/onboardingにアクセスした場合はそのまま表示する
  if (userId && isOnboardingRoutes(request)) return NextResponse.next()

  // 未ログインかつ非公開ルートへのアクセスはログイン画面にリダイレクト
  if (!userId && !isPublicRoutes(request))
    redirectToSignIn({ returnBackUrl: request.url })

  // ログイン済みかつonboardingCompleteがfalseの場合、/onboardingにリダイレクト
  if (userId && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', request.url)
    return NextResponse.redirect(onboardingUrl)
  }

  // // ログイン済みかつonboardingCompleteがtrueの場合、/にリダイレクト
  if (
    userId &&
    sessionClaims?.metadata?.onboardingComplete &&
    isOnboardingRoutes(request)
  ) {
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl)
  }

  // ログイン済かつ非公開ルートにアクセスした場合はそのまま表示する
  if (userId && !isPublicRoutes(request)) return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
