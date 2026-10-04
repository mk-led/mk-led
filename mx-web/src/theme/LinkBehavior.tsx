import type { ComponentProps, Ref } from 'react'
import { Link as RouterLink } from 'react-router'

type LinkBehaviorProps = Omit<ComponentProps<'a'>, 'href'> & { href?: string; ref?: Ref<HTMLAnchorElement> }

const isExternal = (href: string) => /^(https?:|mailto:|tel:|#)/.test(href)

/**
 * Makes every MUI <Link> and <Button href> a client-side route for internal paths and a
 * plain anchor for external ones — always a real <a href>, so links stay crawlable.
 */
export function LinkBehavior({ href = '', ref, ...props }: LinkBehaviorProps) {
  if (isExternal(href)) return <a ref={ref} href={href} {...props} />
  return <RouterLink ref={ref} to={href} {...props} />
}
