import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router'
import { SiteLayout } from '../components/layout/SiteLayout'
import NotFoundPage from '../pages/NotFoundPage'
import RouteErrorPage from '../pages/RouteErrorPage'

/** Every page is code-split; pages are pre-rendered, so content is visible before any page JS loads. */
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

export const routes: RouteObject[] = [
  {
    element: <SiteLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        errorElement: <RouteErrorPage />,
        children: [
          { index: true, lazy: page(() => import('../pages/HomePage')) },
          { path: 'products', lazy: page(() => import('../pages/ProductsPage')) },
          { path: 'products/:slug', lazy: page(() => import('../pages/ProductPage')) },
          { path: 'solutions', lazy: page(() => import('../pages/SolutionsPage')) },
          { path: 'solutions/:slug', lazy: page(() => import('../pages/SolutionPage')) },
          { path: 'services', lazy: page(() => import('../pages/ServicesPage')) },
          { path: 'services/:slug', lazy: page(() => import('../pages/ServicePage')) },
          { path: 'projects', lazy: page(() => import('../pages/ProjectsPage')) },
          { path: 'about', lazy: page(() => import('../pages/AboutPage')) },
          { path: 'resources', lazy: page(() => import('../pages/ResourcesPage')) },
          { path: 'resources/:slug', lazy: page(() => import('../pages/ResourcePage')) },
          { path: 'contact', lazy: page(() => import('../pages/ContactPage')) },
          { path: 'request-quote', lazy: page(() => import('../pages/RequestQuotePage')) },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
