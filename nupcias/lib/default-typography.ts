import type { EventTypography } from '@/types/event'

export const classicWeddingTypography: EventTypography = {
  hero: {
    title: { fontFamily: 'Playfair Display', fontWeight: 600 },
    subtitle: { fontFamily: 'Inter', fontWeight: 300 },
    body: { fontFamily: 'Inter', fontWeight: 400 },
  },
  countdown: {
    title: { fontFamily: 'Playfair Display', fontWeight: 400 },
    body: { fontFamily: 'Inter', fontWeight: 300 },
    label: { fontFamily: 'Inter', fontWeight: 400 },
  },
  story: {
    title: { fontFamily: 'Playfair Display', fontWeight: 600 },
    subtitle: { fontFamily: 'Inter', fontWeight: 300 },
    body: { fontFamily: 'Lora', fontWeight: 400 },
  },
  gallery: {
    title: { fontFamily: 'Playfair Display', fontWeight: 600 },
    label: { fontFamily: 'Inter', fontWeight: 400 },
  },
  location: {
    title: { fontFamily: 'Playfair Display', fontWeight: 600 },
    body: { fontFamily: 'Inter', fontWeight: 400 },
  },
  rsvp: {
    title: { fontFamily: 'Playfair Display', fontWeight: 400 },
    body: { fontFamily: 'Inter', fontWeight: 300 },
    label: { fontFamily: 'Inter', fontWeight: 400 },
  },
  footer: {
    body: { fontFamily: 'Inter', fontWeight: 400 },
  },
}

export const birthdayTypography: EventTypography = {
  hero: {
    title: { fontFamily: 'Poppins', fontWeight: 700 },
    subtitle: { fontFamily: 'Montserrat', fontWeight: 400 },
    body: { fontFamily: 'Open Sans', fontWeight: 400 },
  },
  countdown: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    body: { fontFamily: 'Montserrat', fontWeight: 400 },
    label: { fontFamily: 'Open Sans', fontWeight: 400 },
  },
  story: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    subtitle: { fontFamily: 'Montserrat', fontWeight: 400 },
    body: { fontFamily: 'Open Sans', fontWeight: 400 },
  },
  gallery: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    label: { fontFamily: 'Montserrat', fontWeight: 400 },
  },
  location: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    body: { fontFamily: 'Open Sans', fontWeight: 400 },
  },
  rsvp: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    body: { fontFamily: 'Montserrat', fontWeight: 400 },
    label: { fontFamily: 'Open Sans', fontWeight: 400 },
  },
  footer: {
    body: { fontFamily: 'Open Sans', fontWeight: 400 },
  },
}

export const quinceaneraTypography: EventTypography = {
  hero: {
    title: { fontFamily: 'Dancing Script', fontWeight: 700 },
    subtitle: { fontFamily: 'Poppins', fontWeight: 400 },
    body: { fontFamily: 'Montserrat', fontWeight: 300 },
  },
  countdown: {
    title: { fontFamily: 'Poppins', fontWeight: 700 },
    body: { fontFamily: 'Montserrat', fontWeight: 400 },
    label: { fontFamily: 'Montserrat', fontWeight: 400 },
  },
  story: {
    title: { fontFamily: 'Great Vibes', fontWeight: 400 },
    subtitle: { fontFamily: 'Poppins', fontWeight: 500 },
    body: { fontFamily: 'Montserrat', fontWeight: 300 },
  },
  gallery: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    label: { fontFamily: 'Montserrat', fontWeight: 400 },
  },
  location: {
    title: { fontFamily: 'Poppins', fontWeight: 600 },
    body: { fontFamily: 'Montserrat', fontWeight: 400 },
  },
  rsvp: {
    title: { fontFamily: 'Great Vibes', fontWeight: 400 },
    body: { fontFamily: 'Montserrat', fontWeight: 300 },
    label: { fontFamily: 'Montserrat', fontWeight: 400 },
  },
  footer: {
    body: { fontFamily: 'Montserrat', fontWeight: 400 },
  },
}

export function getDefaultTypographyForTemplate(templateId: string): EventTypography {
  switch (templateId) {
    case 'classic-wedding':
      return classicWeddingTypography
    case 'birthday-party':
      return birthdayTypography
    case 'quinceanera-party':
      return quinceaneraTypography
    default:
      return classicWeddingTypography
  }
}
