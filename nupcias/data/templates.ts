import type { EventConfig } from '@/types/event'
import { event as classicTemplate } from './event'

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
]
