import type { EventConfig } from '@/types/event'

export const birthday: EventConfig = {
  title: '¡Fiesta de Cumpleaños!',
  tagline: 'Celebra con nosotros este día especial',
  description: 'Una noche inolvidable llena de música, amigos y celebración',
  coverImage: '/images/cover-birthday.png',
  dateLabel: 'Sábado 15 de Marzo',
  locationLabel: 'Club Social y Deportivo',
  showCountdown: true,
  countdownTitle: 'Cuenta regresiva',
  countdownSubtitle: 'Falta cada vez menos',
  dateISO: '2027-03-15T19:00:00',
  showStory: true,
  storyTitle: 'Nuestra historia',
  storySubtitle: 'Un año más de alegría',
  storyImages: ['/images/gallery-1.png'],
  story: [
    {
      text: 'Este año queremos celebrar de una manera especial. Hemos preparado una fiesta inolvidable con amigos, familia y mucha música.',
    },
    {
      text: 'Será una noche llena de sorpresas, deliciosa comida, bebidas y momentos que recordaremos por siempre.',
    },
    {
      text: 'Tu presencia es el mejor regalo que podemos recibir. Ven a compartir la alegría y la felicidad de este día tan especial.',
    },
  ],
  details: [
    {
      label: 'Fecha',
      value: 'Sábado 15 de Marzo',
      caption: '2027',
    },
    {
      label: 'Hora',
      value: '20:00 hs',
      caption: 'Hasta las 4:00 hs',
    },
    {
      label: 'Lugar',
      value: 'Club Social y Deportivo',
      caption: 'Av. Libertador 1234',
    },
    {
      label: 'Dress code',
      value: 'Elegante Sport',
      caption: 'Cómodo pero elegante',
    },
  ],
  showLocation: true,
  location: {
    venue: 'Club Social y Deportivo',
    address: 'Av. Libertador 1234, Buenos Aires, Argentina',
    mapQuery: 'Club Social y Deportivo, Buenos Aires, Argentina',
  },
  showGallery: true,
  gallery: [
    { src: '/images/gallery-1.png', alt: 'Decoración de fiesta' },
    { src: '/images/gallery-2.png', alt: 'Pastel de cumpleaños' },
    { src: '/images/gallery-3.png', alt: 'Bailando en la pista' },
    { src: '/images/gallery-4.png', alt: 'Brindis con amigos' },
  ],
  showRSVP: true,
  rsvp: {
    heading: '¿Vienes a la fiesta?',
    subheading:
      'Tu presencia es el mejor regalo. Por favor confirmanos si nos vas a acompañar en esta celebración.',
    buttonLabel: 'Confirmar asistencia',
    deadline: 'Te pedimos confirmar antes del 1 de Marzo, 2027',
  },
  brand: {
    name: 'Invita',
    tagline: 'Invitaciones digitales que se sienten inolvidables',
  },
  typography: {
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
  },
}
