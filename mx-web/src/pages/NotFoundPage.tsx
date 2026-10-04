import { ArrowButton } from '../components/ui/ArrowButton'
import { PageHeader } from '../components/ui/PageHeader'
import { paths } from '../routes/paths'
import { SEO } from '../seo/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found" description="The page you were looking for does not exist or has moved." path="/404" noindex />
      <PageHeader
        eyebrow="Error 404"
        title="This screen is dark."
        intro="The page you were looking for doesn’t exist or has moved. Try one of these instead."
        actions={
          <>
            <ArrowButton href="/">Back to home</ArrowButton>
            <ArrowButton href={paths.products} variant="outlined">
              Explore LED Solutions
            </ArrowButton>
            <ArrowButton href={paths.contact} variant="outlined">
              Contact us
            </ArrowButton>
          </>
        }
      />
    </>
  )
}
