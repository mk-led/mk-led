import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { createEmotionCache } from './lib/emotionCache'
import { routes } from './routes/router'

export { indexablePaths } from './routes/paths'
export { site } from './content/site'

/**
 * Renders one URL to HTML for the build-time pre-renderer (scripts/prerender.mjs).
 * Returns the app markup, the critical Emotion CSS for that page and the HTTP status.
 */
export async function render(url: string) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const context = await query(new Request(new URL(url, 'http://prerender.local')))
  if (context instanceof Response) throw new Error(`Unexpected redirect while pre-rendering ${url}`)

  const router = createStaticRouter(dataRoutes, context)
  const cache = createEmotionCache()
  const emotionServer = createEmotionServer(cache)

  const html = renderToString(
    <StrictMode>
      <CacheProvider value={cache}>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </CacheProvider>
    </StrictMode>,
  )
  const styles = emotionServer.constructStyleTagsFromChunks(emotionServer.extractCriticalToChunks(html))
  return { html, styles, status: context.statusCode }
}
