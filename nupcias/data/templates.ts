import type { EventConfig } from '@/types/event'
import { event as classicTemplate } from './event'
import { birthday as birthdayTemplate } from './birthday'

export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  category: 'wedding' | 'birthday' | 'corporate' | 'other'
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
]
