import IconButton from '@mui/material/IconButton'
import { useColorScheme } from '@mui/material/styles'
import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

/** Dark/light switch. Renders a neutral placeholder until mounted, so pre-rendered HTML never mismatches. */
export function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const resolved = mode === 'system' ? systemMode : mode
  const next = resolved === 'dark' ? 'light' : 'dark'

  return (
    <IconButton
      aria-label={mounted ? `Switch to ${next} theme` : 'Switch colour theme'}
      onClick={() => setMode(next)}
      sx={{ visibility: mounted ? 'visible' : 'hidden' }}
    >
      {resolved === 'light' ? <Moon size={18} strokeWidth={1.5} aria-hidden="true" /> : <Sun size={18} strokeWidth={1.5} aria-hidden="true" />}
    </IconButton>
  )
}
