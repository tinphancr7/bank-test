import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

const Layout = lazy(() => import('@/components/layout/layout'))
const BinanceManageApiKey = lazy(
  () => import('@/pages/binance/BinanceManageApiKey.page')
)
const BinanceManageAccount = lazy(
  () => import('@/pages/binance/BinanceManageAccount.page')
)

const BankDetail = lazy(() => import('@/pages/bank-management/bank.detailt'))
const BankManagement = lazy(
  () => import('@/pages/bank-management/bank.management')
)
const PermissionPage = lazy(() => import('@/pages/permission/Permission'))
const SkeletonPage = lazy(() => import('@/pages/skeleton-page/SkeletionPage'))
const UnauthorizationPage = lazy(
  () => import('@/pages/unauthorization/unauthorization.page')
)
const UserManagement = lazy(
  () => import('@/pages/user-management/user.management')
)
const AuthenticationRoute = lazy(
  () => import('@/providers/authentication.route')
)

const LoginRoute = lazy(() => import('@/providers/login.route'))
const LoginPage = lazy(() => import('@/pages/login/login.page'))

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <h1>dasdsa</h1>,
    element: (
      <Suspense fallback={<SkeletonPage />}>
        <AuthenticationRoute>
          <Layout />
        </AuthenticationRoute>
      </Suspense>
    ),
    children: [
      {
        path: '/bank-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <BankManagement />
          </Suspense>
        )
      },
      {
        path: '/bank-management/:id',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <BankDetail />
          </Suspense>
        )
      },
      {
        path: '/binance/user-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <BinanceManageAccount />
          </Suspense>
        )
      },
      {
        path: '/binance/api-key-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <BinanceManageApiKey />
          </Suspense>
        )
      },
      {
        path: '/reminato/user-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <h2>Reminato user management</h2>
          </Suspense>
        )
      },
      {
        path: '/reminato/api-key-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <h2>Reminato api key management</h2>
          </Suspense>
        )
      },
      {
        path: '/api-key-binance-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <h2>api-key-binance-management</h2>
          </Suspense>
        )
      },
      {
        path: '/role-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <h2>roles management</h2>
          </Suspense>
        )
      },
      {
        path: '/user-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <UserManagement />
          </Suspense>
        )
      },
      {
        path: '/permission-management',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <PermissionPage />
          </Suspense>
        )
      },
      {
        path: '/unauthorization',
        element: (
          <Suspense fallback={<SkeletonPage />}>
            <UnauthorizationPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<SkeletonPage />}>
        <LoginRoute>
          <LoginPage />
        </LoginRoute>
      </Suspense>
    )
  }
])

export default router
