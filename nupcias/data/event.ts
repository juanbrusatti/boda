import type { EventConfig } from '@/types/event'

/**
 * Single source of truth for all event content.
 *
 * This object is intentionally local so the template can be validated with real
 * clients without any backend. The shape mirrors what a future Supabase row
 * would return, so swapping `event` for `await getEvent(slug)` later requires
 * no changes to the components that consume it.
 */
export const event: EventConfig = {
  title: 'María & Juan',
  tagline: 'Nos casamos',
  dateLabel: '20 de Febrero, 2027',
  dateISO: '2027-02-20T19:00:00',
  showCountdown: true,
  countdownTitle: 'Cuenta regresiva',
  countdownSubtitle: 'Falta cada vez menos',
  locationLabel: 'Salón Los Robles · Buenos Aires',
  description:
    'Con la bendición de nuestras familias, queremos celebrar el comienzo de nuestra historia rodeados de las personas que más amamos.',
  coverImage: '/images/hero.png',
  showStory: true,
  storyTitle: 'Nuestra historia',
  storySubtitle: 'Dos caminos que se vuelven uno',
  storyImages: ['/images/story.png'],
  story: [
    {
      text: 'Todo comenzó una tarde de otoño, entre cafés interminables y conversaciones que no querían terminar. Lo que parecía un encuentro casual se transformó, con el tiempo, en la certeza de que queríamos caminar juntos el resto del camino.',
    },
    {
      text: 'Siete años, dos mudanzas, incontables viajes y un perro más tarde, decidimos dar el siguiente paso. Y no se nos ocurre mejor manera de hacerlo que rodeados de quienes han sido parte de nuestra historia.',
    },
  ],
  details: [
    {
      label: 'Fecha',
      value: 'Sábado 20 de Febrero',
      caption: '2027',
    },
    {
      label: 'Ceremonia',
      value: '19:00 hs',
      caption: 'Recepción a continuación',
    },
    {
      label: 'Lugar',
      value: 'Salón Los Robles',
      caption: 'Camino de los Robles 1450',
    },
    {
      label: 'Código de vestimenta',
      value: 'Elegante',
      caption: 'Formal de noche',
    },
  ],
  location: {
    venue: 'Salón Los Robles',
    address: 'Camino de los Robles 1450, Buenos Aires, Argentina',
    mapQuery: 'Salón Los Robles, Buenos Aires, Argentina',
  },
  gallery: [
    { src: '/images/gallery-1.png', alt: 'Los novios tomados de la mano' },
    { src: '/images/gallery-2.png', alt: 'Mesa de recepción elegante con velas' },
    { src: '/images/gallery-3.png', alt: 'Pareja bailando bajo luces cálidas' },
    { src: '/images/gallery-4.png', alt: 'Ramo de novia sobre una silla vintage' },
  ],
  rsvp: {
    heading: 'Confirmá tu asistencia',
    subheading:
      'Tu presencia es el mejor regalo. Por favor confirmanos si nos vas a acompañar en este día tan especial.',
    buttonLabel: 'Confirmar asistencia',
    deadline: 'Te pedimos confirmar antes del 20 de Enero, 2027',
  },
  brand: {
    name: 'Invita',
    tagline: 'Invitaciones digitales que se sienten inolvidables',
  },
}
