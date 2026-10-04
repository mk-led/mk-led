import createCache from '@emotion/cache'

/**
 * Emotion cache shared by client and server. The key must match on both sides so the
 * critical CSS embedded in pre-rendered HTML is reused on hydration instead of re-injected.
 */
export function createEmotionCache() {
  return createCache({ key: 'mk', prepend: true })
}
