/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical public origin, e.g. https://www.mx-led.com — used for canonical URLs and Open Graph. */
  readonly VITE_SITE_URL?: string
  /** HTTPS endpoint that accepts quote requests as JSON (POST). Leave unset to fall back to email. */
  readonly VITE_INQUIRY_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
