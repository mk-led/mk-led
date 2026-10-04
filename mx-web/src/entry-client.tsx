import { CacheProvider } from '@emotion/react'
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import { startTransition, StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, matchRoutes } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { createEmotionCache } from './lib/emotionCache'
import { routes } from './routes/router'

const container = document.getElementById('root')!
const prerendered = container.hasChildNodes()

if (prerendered) {
  // Resolve the lazy route modules for this URL first, so hydration renders the same tree as the server.
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy) ?? []
  await Promise.all(
    lazyMatches.map(async (m) => {
      const routeModule = await (m.route.lazy as () => Promise<Record<string, unknown>>)()
      Object.assign(m.route, { ...routeModule, lazy: undefined })
    }),
  )
}

const router = createBrowserRouter(routes)
const app = (
  <StrictMode>
    <CacheProvider value={createEmotionCache()}>
      <RouterProvider router={router} />
    </CacheProvider>
  </StrictMode>
)

// Hydrate as a transition so React yields to the browser between chunks of work: the
// pre-rendered page stays responsive (links are real anchors) while it becomes interactive.
if (prerendered) startTransition(() => void hydrateRoot(container, app))
else createRoot(container).render(app)
