import type { EventConfig } from '@/types/event'
import { event as classicTemplate } from './event'
import { birthday as birthdayTemplate } from './birthday'
import { quinceanera as quinceaneraTemplate } from './quinceanera'

export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  category: 'wedding' | 'birthday' | 'quinceanera' | 'corporate' | 'other'
  data: EventConfig
}

export const templates: Template[] = [
  {
    id: 'classic-wedding',
    name: 'Boda Clásica',
    description: 'Elegante y atemporal, perfecta para bodas tradicionales',
    thumbnail: '/images/gallery-1.png',
    category: 'wedding',
    data: classicTemplate,
  },
  {
    id: 'birthday-party',
    name: 'Fiesta de Cumpleaños',
    description: 'Divertida y festiva, ideal para celebrar cumpleaños especiales',
    thumbnail: '/images/gallery-2.png',
    category: 'birthday',
    data: birthdayTemplate,
  },
  {
    id: 'quinceanera-party',
    name: 'Mis 15 Años',
    description: 'Mágica y especial, diseñada para celebrar quinceañeras',
    thumbnail: '/images/gallery-3.png',
    category: 'quinceanera',
    data: quinceaneraTemplate,
  },
]
