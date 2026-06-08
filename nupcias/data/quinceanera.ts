import type { EventConfig } from '@/types/event'
import { getDefaultColors } from '@/lib/default-colors'

export const quinceanera: EventConfig = {
  title: 'Mis 15 Años',
  tagline: 'Una noche mágica que recordaré por siempre',
  description: 'Celebra conmigo este momento tan especial de mi vida',
  coverImage: '/images/cover-quinceanera.png',
  dateLabel: 'Sábado 20 de Junio',
  locationLabel: 'Salón de Eventos La Quinta',
  showCountdown: true,
  countdownTitle: 'Cuenta regresiva',
  countdownSubtitle: 'Falta cada vez menos para mi gran noche',
  dateISO: '2027-06-20T20:00:00',
  showStory: true,
  storyTitle: 'Mi historia',
  storySubtitle: '15 años de sueños cumplidos',
  storyImages: ['/images/gallery-1.png'],
  story: [
    {
      text: 'Desde pequeña soñé con este día especial. 15 años llenos de alegría, amor y momentos inolvidables con mi familia y amigos.',
    },
    {
      text: 'Gracias a todos los que me acompañan en este camino. Su amor y apoyo son el mejor regalo que he recibido en estos 15 años.',
    },
    {
      text: 'Esta noche será mágica, llena de música, baile y celebración. Los espero para compartir juntos este momento tan importante en mi vida.',
    },
  ],
  details: [
    {
      label: 'Fecha',
      value: 'Sábado 20 de Junio',
      caption: '2027',
    },
    {
      label: 'Hora',
      value: '21:00 hs',
      caption: 'Hasta las 5:00 hs',
    },
    {
      label: 'Lugar',
      value: 'Salón de Eventos La Quinta',
      caption: 'Av. del Libertador 2500',
    },
    {
      label: 'Dress code',
      value: 'Formal',
      caption: 'Elegante y festivo',
    },
    {
      label: 'Padrinos',
      value: 'A confirmar',
      caption: 'Ceremonia especial',
    },
  ],
  showLocation: true,
  location: {
    venue: 'Salón de Eventos La Quinta',
    address: 'Av. del Libertador 2500, Buenos Aires, Argentina',
    mapQuery: 'Salón de Eventos La Quinta, Buenos Aires, Argentina',
  },
  showGallery: true,
  gallery: [
    { src: '/images/gallery-1.png', alt: 'Foto de la quinceañera' },
    { src: '/images/gallery-2.png', alt: 'Decoración de la fiesta' },
    { src: '/images/gallery-3.png', alt: 'Momento del vals' },
    { src: '/images/gallery-4.png', alt: 'Brindis con familia' },
    { src: '/images/gallery-1.png', alt: 'Amigos celebrando' },
    { src: '/images/gallery-2.png', alt: 'Pastel de 15 años' },
  ],
  showRSVP: true,
  rsvp: {
    heading: '¿Vienes a mis 15?',
    subheading:
      'Tu presencia hace este día aún más especial. Por favor confirmanos si nos vas a acompañar en esta celebración tan importante.',
    buttonLabel: 'Confirmar asistencia',
    deadline: 'Te pedimos confirmar antes del 1 de Junio, 2027',
  },
  brand: {
    name: 'Invita',
    tagline: 'Invitaciones digitales que se sienten inolvidables',
  },
  typography: {
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
  },
  colors: getDefaultColors('quinceanera'),
}
