import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router'
import { MediaFrame } from '../../components/media/MediaFrame'
import { SceneVisual } from '../../components/media/SceneVisual'
import { Reveal } from '../../components/ui/Reveal'
import { getImage } from '../../content/images'
import { projectCategories, projects } from '../../content/projects'
import type { Project, ProjectCategory } from '../../content/types'

const isCategory = (value: string | null): value is ProjectCategory => projectCategories.some((c) => c.id === value)
const labelFor = (id: ProjectCategory) => projectCategories.find((c) => c.id === id)?.label ?? id

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const meta = [project.location, project.year].filter(Boolean).join(' · ')
  return (
    <Box component="article" sx={{ display: 'grid', gap: 2 }}>
      <MediaFrame
        imageKey={project.image}
        fallback={<SceneVisual kind="interior" seed={project.slug} />}
        ratio={featured ? '16 / 9' : '4 / 3'}
        sizes={featured ? '(min-width: 1200px) 66vw, 100vw' : '(min-width: 1200px) 33vw, (min-width: 600px) 50vw, 100vw'}
        caption
      />
      <Box sx={{ display: 'grid', gap: 1 }}>
        <Typography variant="overline" component="p" sx={{ color: 'primary.main', fontSize: '0.6875rem' }}>
          {project.example && <Box component="span" sx={{ color: 'brand.subtle' }}>Example · </Box>}
          {project.categories.map(labelFor).join(' / ')}
        </Typography>
        <Typography variant={featured ? 'h2' : 'h3'} component="h3" sx={featured ? { fontSize: 'clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)' } : undefined}>
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '52ch' }}>
          {project.summary}
        </Typography>
        {meta && (
          <Typography variant="mono" sx={{ color: 'brand.subtle' }}>
            {meta}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

interface ProjectGalleryProps {
  limit?: number
  /** Category filters, kept in the URL (?category=) so views are shareable. */
  filterable?: boolean
}

export function ProjectGallery({ limit, filterable = false }: ProjectGalleryProps) {
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const active = filterable && isCategory(requested) ? requested : null
  // Lead with projects that have photography.
  const ordered = [...projects].sort((a, b) => Number(!!getImage(b.image)) - Number(!!getImage(a.image)))
  const visible = ordered.filter((p) => !active || p.categories.includes(active)).slice(0, limit)

  const select = (id: ProjectCategory | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set('category', id)
    else next.delete('category')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <div>
      {filterable && (
        <Box role="group" aria-label="Filter projects by category" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 5 }}>
          {[{ id: null, label: 'All' }, ...projectCategories].map((c) => {
            const pressed = active === c.id
            return (
              <ButtonBase
                key={c.label}
                aria-pressed={pressed}
                onClick={() => select(c.id as ProjectCategory | null)}
                sx={{
                  minHeight: 44,
                  px: 2,
                  border: 1,
                  borderRadius: 0.5,
                  fontSize: '0.9375rem',
                  borderColor: pressed ? 'primary.main' : 'divider',
                  bgcolor: pressed ? 'brand.accentSoft' : 'transparent',
                  color: pressed ? 'text.primary' : 'text.secondary',
                  '&:hover': { color: 'text.primary', borderColor: pressed ? 'primary.main' : 'brand.lineStrong' },
                }}
              >
                {c.label}
              </ButtonBase>
            )
          })}
        </Box>
      )}

      <p className="visually-hidden" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'} shown
      </p>

      {visible.length === 0 ? (
        <Typography sx={{ color: 'text.secondary', py: 6 }}>No projects in this category yet.</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: { xs: 6, md: 5 }, columnGap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' } }}>
          {visible.map((project, i) => (
            <Box key={project.slug} sx={i === 0 ? { gridColumn: { sm: '1 / -1', lg: 'span 2' }, gridRow: { lg: 'span 2' } } : undefined}>
              <Reveal delay={(i % 3) * 70}>
                <ProjectCard project={project} featured={i === 0} />
              </Reveal>
            </Box>
          ))}
        </Box>
      )}
    </div>
  )
}
