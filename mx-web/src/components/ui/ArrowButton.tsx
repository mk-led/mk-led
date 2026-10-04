import Button, { type ButtonProps } from '@mui/material/Button'
import { ArrowRight } from 'lucide-react'

/** Button with the brand's trailing arrow. Use `href` for navigation — it renders a real link. */
export function ArrowButton({ children, variant = 'contained', ...props }: ButtonProps) {
  return (
    <Button variant={variant} endIcon={<ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />} {...props}>
      {children}
    </Button>
  )
}
