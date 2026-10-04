import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
  style?: CSSProperties
}

/**
 * Fades content up once as it enters the viewport. Content stays fully visible
 * when JavaScript, IntersectionObserver or motion is unavailable.
 */
export function Reveal({ as: Tag = 'div', children, className, delay = 0, style }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) return // Already on screen: don't hide it.

    el.dataset.reveal = 'pending'
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = 'shown'
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}>
      {children}
    </Tag>
  )
}
