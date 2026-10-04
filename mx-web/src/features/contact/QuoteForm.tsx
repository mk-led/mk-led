import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { CircleCheck, Mail, MessageCircle } from 'lucide-react'
import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { ArrowButton } from '../../components/ui/ArrowButton'
import { products } from '../../content/products'
import { site } from '../../content/site'
import {
  emptyInquiry,
  inquiryMailto,
  InquiryEndpointMissingError,
  inquiryWhatsapp,
  LIMITS,
  projectTypes,
  submitInquiry,
  timelines,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
} from './inquiry'

type Status = 'idle' | 'submitting' | 'sent' | 'fallback' | 'error'

function Group({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <Box component="fieldset" sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
      <Typography
        component="legend"
        variant="overline"
        sx={{ width: '100%', color: 'text.secondary', pb: 1.5, mb: 3, borderBottom: 1, borderColor: 'brand.lineStrong' }}
      >
        {legend}
      </Typography>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, '& .wide': { gridColumn: '1 / -1' } }}>{children}</Box>
    </Box>
  )
}

/**
 * Quote request: short, labelled fields grouped by purpose. Validates on submit with
 * accessible inline errors, then posts to the configured endpoint — or, when none is
 * configured, offers the same details via WhatsApp or email so nothing is lost.
 */
export function QuoteForm({ initialProduct = '' }: { initialProduct?: string }) {
  const uid = useId()
  const [values, setValues] = useState<Inquiry>({ ...emptyInquiry, product: initialProduct })
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target
    const next = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value
    setValues((v) => ({ ...v, [name]: next }))
    if (errors[name as keyof Inquiry]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  /** Shared props for a text field bound to `name`. */
  const field = (name: keyof Inquiry, label: string, extra: Partial<TextFieldProps> & { hint?: string } = {}): TextFieldProps => {
    const { hint, ...rest } = extra
    return {
      id: `${uid}-${name}`,
      name,
      label,
      value: values[name] as string,
      onChange: update,
      error: !!errors[name],
      helperText: errors[name] ?? hint,
      ...rest,
    }
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validateInquiry(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      await submitInquiry(values)
      setStatus('sent')
    } catch (error) {
      setStatus(error instanceof InquiryEndpointMissingError ? 'fallback' : 'error')
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  if (status === 'sent') {
    return (
      <Stack ref={statusRef} tabIndex={-1} role="status" spacing={2} sx={{ p: { xs: 3, sm: 5 }, border: 1, borderColor: 'brand.lineStrong', outline: 'none' }}>
        <Box sx={{ color: 'success.main' }}>
          <CircleCheck size={28} strokeWidth={1.5} aria-hidden="true" />
        </Box>
        <Typography variant="h3" component="h2">
          Thank you — your request is with our team.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>An MK-LED specialist will review the details and contact you shortly.</Typography>
      </Stack>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const whatsapp = inquiryWhatsapp(values)
  const mailto = inquiryMailto(values)

  return (
    <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-required`} sx={{ display: 'grid', gap: 5 }}>
      <Typography id={`${uid}-required`} variant="caption" sx={{ color: 'brand.subtle' }}>
        Fields marked * are required.
      </Typography>

      {errorCount > 0 && (
        <Alert severity="error" variant="outlined" role="alert">
          Please correct {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`}.
        </Alert>
      )}

      <Group legend="About you">
        <TextField {...field('name', 'Name', { required: true, autoComplete: 'name', slotProps: { htmlInput: { maxLength: LIMITS.name } } })} />
        <TextField {...field('company', 'Company', { autoComplete: 'organization', slotProps: { htmlInput: { maxLength: LIMITS.company } } })} />
        <TextField
          {...field('phone', 'Phone / WhatsApp', { required: true, type: 'tel', autoComplete: 'tel', slotProps: { htmlInput: { maxLength: LIMITS.phone, inputMode: 'tel' } } })}
        />
        <TextField
          {...field('email', 'Email', { type: 'email', autoComplete: 'email', slotProps: { htmlInput: { maxLength: LIMITS.email, inputMode: 'email' } } })}
        />
      </Group>

      <Group legend="Your project">
        <TextField {...field('projectType', 'Project type', { select: true, slotProps: { select: { displayEmpty: true } } })}>
          <MenuItem value="">Select…</MenuItem>
          {projectTypes.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <TextField {...field('product', 'Interested in', { select: true, slotProps: { select: { displayEmpty: true } } })}>
          <MenuItem value="">Not sure yet</MenuItem>
          {products.map((p) => (
            <MenuItem key={p.slug} value={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </TextField>

        <FormControl className="wide" component="fieldset">
          <FormLabel component="legend" sx={{ fontSize: '0.9375rem', fontWeight: 500, mb: 0.5 }}>
            Indoor or outdoor?
          </FormLabel>
          <RadioGroup row name="environment" value={values.environment} onChange={update}>
            <FormControlLabel value="indoor" control={<Radio />} label="Indoor" sx={{ minHeight: 44, mr: 3 }} />
            <FormControlLabel value="outdoor" control={<Radio />} label="Outdoor" sx={{ minHeight: 44, mr: 3 }} />
            <FormControlLabel value="unsure" control={<Radio />} label="Not sure" sx={{ minHeight: 44 }} />
          </RadioGroup>
        </FormControl>

        <TextField {...field('size', 'Approximate display size', { hint: 'e.g. 4 m × 2.25 m, or “fills a 6 m wall”', slotProps: { htmlInput: { maxLength: LIMITS.size } } })} />
        <TextField {...field('location', 'Project location', { hint: 'City and state', autoComplete: 'address-level2', slotProps: { htmlInput: { maxLength: LIMITS.location } } })} />
        <TextField {...field('timeline', 'Expected timeline', { select: true, slotProps: { select: { displayEmpty: true } } })}>
          <MenuItem value="">Select…</MenuItem>
          {timelines.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          {...field('message', 'Project details', {
            required: true,
            multiline: true,
            minRows: 5,
            className: 'wide',
            hint: 'Where will the display go, who will watch it, and what will it show?',
            slotProps: { htmlInput: { maxLength: LIMITS.message } },
          })}
        />
      </Group>

      {/* Honeypot: off-screen and skipped by keyboard and assistive tech. */}
      <Box aria-hidden="true" sx={{ position: 'absolute', left: -10000, width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
      </Box>

      <FormControl error={!!errors.consent}>
        <FormControlLabel
          sx={{ alignItems: 'flex-start', m: 0, '& .MuiCheckbox-root': { mt: -1, ml: -1 } }}
          control={
            <Checkbox
              name="consent"
              checked={values.consent}
              onChange={update}
              slotProps={{ input: { 'aria-required': true, 'aria-invalid': !!errors.consent, 'aria-describedby': errors.consent ? `${uid}-consent-error` : undefined } }}
            />
          }
          label={`I agree that ${site.name} may contact me about this enquiry. *`}
        />
        {errors.consent && <FormHelperText id={`${uid}-consent-error`}>{errors.consent}</FormHelperText>}
      </FormControl>

      <Box>
        <ArrowButton type="submit" size="large" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Request a Quote'}
        </ArrowButton>
      </Box>

      {(status === 'fallback' || status === 'error') && (
        <Stack ref={statusRef} tabIndex={-1} role="alert" spacing={2} sx={{ p: 3, border: 1, borderColor: 'brand.lineStrong', borderLeft: 2, borderLeftColor: 'primary.main', outline: 'none' }}>
          <Typography>
            {status === 'error' ? 'We couldn’t send your request just now.' : 'Online submission isn’t available at the moment.'} Send the same details
            instantly — nothing you entered is lost.
          </Typography>
          <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1.5 }}>
            {whatsapp && (
              <Button variant="contained" href={whatsapp} target="_blank" rel="noopener noreferrer" startIcon={<MessageCircle size={18} aria-hidden="true" />}>
                Send via WhatsApp
              </Button>
            )}
            {mailto && (
              <Button variant="outlined" href={mailto} startIcon={<Mail size={18} aria-hidden="true" />}>
                Send by email
              </Button>
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  )
}
