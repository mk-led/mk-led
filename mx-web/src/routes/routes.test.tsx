import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import { indexablePaths } from './paths'
import { routes } from './router'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('routes', () => {
  it('renders the home hero with both calls to action', async () => {
    renderAt('/')
    const h1 = await screen.findByRole('heading', { level: 1, name: 'Light Up Every Moment.' }, { timeout: 5000 })
    const hero = h1.closest('section')!
    expect(within(hero).getByRole('link', { name: /request a quote/i })).toHaveAttribute('href', '/request-quote')
    expect(within(hero).getByRole('link', { name: /explore led solutions/i })).toHaveAttribute('href', '/products')
  })

  it('renders a product page without inventing specifications', async () => {
    renderAt('/products/p3-led-display')
    expect(await screen.findByRole('heading', { level: 1, name: 'P3 LED Display' })).toBeInTheDocument()
    expect(screen.getAllByText('Confirmed during design').length).toBeGreaterThan(0)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toHaveTextContent(/Home.*Products.*P3 LED Display/)
  })

  it('renders the not-found page for unknown products and paths', async () => {
    renderAt('/products/does-not-exist')
    expect(await screen.findByRole('heading', { level: 1, name: /this screen is dark/i })).toBeInTheDocument()
  })

  it('filters projects by category via the URL', async () => {
    const user = userEvent.setup()
    const router = renderAt('/projects')
    const filters = await screen.findByRole('group', { name: /filter projects/i })
    await user.click(within(filters).getByRole('button', { name: 'Events' }))
    expect(router.state.location.search).toBe('?category=events')
    expect(screen.getByRole('heading', { level: 3, name: /concert stage/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: /boardroom/i })).not.toBeInTheDocument()
  })

  it('renders the contact page with direct channels', async () => {
    renderAt('/contact')
    expect(await screen.findByRole('heading', { level: 1, name: /let’s talk/i })).toBeInTheDocument()
    const channels = screen.getByRole('list', { name: /ways to contact/i })
    expect(within(channels).getByRole('link', { name: /sales@mkled\.net/i })).toHaveAttribute('href', 'mailto:sales@mkled.net')
    expect(within(channels).getByRole('link', { name: /call/i })).toHaveAttribute('href', 'tel:+919742755592')
    expect(within(channels).getByRole('link', { name: /whatsapp/i }).getAttribute('href')).toMatch(/^https:\/\/wa\.me\/919742755592\?text=/)
    expect(within(channels).getByRole('link', { name: /krishnagiri/i }).getAttribute('href')).toMatch(/^https:\/\/www\.google\.com\/maps\//)
  })

  it('pre-selects the product on the quote page', async () => {
    renderAt('/request-quote?product=p4-led-display')
    expect(await screen.findByRole('heading', { level: 1, name: /tell us about your project/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /interested in/i })).toHaveTextContent('P4 LED Display')
  })

  it('switches pixel pitch with the keyboard', async () => {
    const user = userEvent.setup()
    renderAt('/resources/led-pixel-pitch-guide')
    const p2 = await screen.findByRole('tab', { name: /^P2,/ })
    await user.click(p2)
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: /^P2\.5,/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('1,60,000 pixels per m²')
  })

  it.each(indexablePaths().map((e) => e.path))('%s renders exactly one h1', async (path) => {
    renderAt(path)
    await screen.findAllByRole('heading', { level: 1 }, { timeout: 5000 })
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })
})
