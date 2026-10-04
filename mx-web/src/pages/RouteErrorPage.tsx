import { isRouteErrorResponse, useRouteError } from 'react-router'
import { ArrowButton } from '../components/ui/ArrowButton'
import { PageHeader } from '../components/ui/PageHeader'
import { SEO } from '../seo/SEO'
import NotFoundPage from './NotFoundPage'

/** Route-level error boundary: 404s show the not-found page; anything else a recoverable message. */
export default function RouteErrorPage() {
  const error = useRouteError()
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />
  if (import.meta.env.DEV) console.error(error)

  return (
    <>
      <SEO title="Something went wrong" description="A technical fault occurred." path="/error" noindex />
      <PageHeader
        eyebrow="Something went wrong"
        title="We hit a technical fault."
        intro="Please reload the page. If the problem continues, contact us and we’ll help directly."
        actions={<ArrowButton href="/">Back to home</ArrowButton>}
      />
    </>
  )
}
