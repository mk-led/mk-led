import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import { AppThemeProvider } from '../../theme/AppThemeProvider'
import { QuoteForm } from './QuoteForm'

const renderForm = (initialProduct?: string) =>
  render(
    <MemoryRouter>
      <AppThemeProvider>
        <QuoteForm initialProduct={initialProduct} />
      </AppThemeProvider>
    </MemoryRouter>,
  )

describe('QuoteForm', () => {
  it('shows accessible errors and focuses the first invalid field', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: /request a quote/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/4 highlighted fields/)
    const name = screen.getByRole('textbox', { name: /^name/i })
    expect(name).toHaveFocus()
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveAccessibleDescription(/please enter your name/i)
  })

  it('offers WhatsApp and email when no submission endpoint is configured', async () => {
    const user = userEvent.setup()
    renderForm('P3 LED Display')

    const fill = async (name: RegExp, value: string) => {
      await user.click(screen.getByRole('textbox', { name }))
      await user.paste(value)
    }
    await fill(/^name/i, 'Alex Kumar')
    await fill(/phone/i, '+91 98765 43210')
    await fill(/project details/i, 'Auditorium wall, roughly 6 m wide.')
    await user.click(screen.getByRole('checkbox'))
    await user.click(screen.getByRole('button', { name: /request a quote/i }))

    const whatsapp = await screen.findByRole('link', { name: /send via whatsapp/i })
    expect(whatsapp.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/919742755592\?text=.*P3%20LED%20Display/)
    expect(screen.getByRole('link', { name: /send by email/i }).getAttribute('href')).toMatch(/^mailto:sales@mkled\.net/)
  }, 15_000)
})
