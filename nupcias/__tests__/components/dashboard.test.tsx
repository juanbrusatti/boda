import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/hero'
import { EventInfo } from '@/components/sections/event-info'
import { Countdown } from '@/components/sections/countdown'
import type { EventConfig } from '@/types/event'

const mockEventConfig: EventConfig = {
  title: 'Test Event',
  tagline: 'Test Tagline',
  dateLabel: '20 Febrero 2027',
  dateISO: '2027-02-20T19:00:00',
  showCountdown: true,
  countdownTitle: 'Cuenta regresiva',
  countdownSubtitle: 'Falta cada vez menos',
  locationLabel: 'Test Location',
  description: 'Test Description',
  coverImage: '/images/hero.png',
  storyImage: '/images/story.png',
  storyHeading: 'Nuestra historia',
  story: [{ text: 'Test story' }],
  details: [],
  location: {
    venue: 'Test Venue',
    address: 'Test Address',
    mapQuery: 'Test Map Query',
  },
  gallery: [],
  rsvp: {
    heading: 'RSVP',
    subheading: 'Please RSVP',
    buttonLabel: 'RSVP',
    deadline: '2027-02-01',
  },
  brand: {
    name: 'Test Brand',
    tagline: 'Test Brand Tagline',
  },
}

describe('Dashboard Components', () => {
  describe('Hero', () => {
    it('should render hero with event title and tagline', () => {
      render(<Hero event={mockEventConfig} />)
      expect(screen.getByText('Test Event')).toBeInTheDocument()
      expect(screen.getByText('Test Tagline')).toBeInTheDocument()
    })

    it('should render hero with date label', () => {
      render(<Hero event={mockEventConfig} />)
      expect(screen.getByText('20 Febrero 2027')).toBeInTheDocument()
    })
  })

  describe('EventInfo', () => {
    it('should render event info heading', () => {
      render(<EventInfo event={mockEventConfig} />)
      expect(screen.getByText('Detalles del evento')).toBeInTheDocument()
      expect(screen.getByText('Todo lo que necesitás saber')).toBeInTheDocument()
    })
  })

  describe('Countdown', () => {
    it('should render countdown when showCountdown is true', () => {
      render(<Countdown event={mockEventConfig} />)
      expect(screen.getByText('Cuenta regresiva')).toBeInTheDocument()
      expect(screen.getByText('Falta cada vez menos')).toBeInTheDocument()
    })

    it('should not render countdown when showCountdown is false', () => {
      const config = { ...mockEventConfig, showCountdown: false }
      const { container } = render(<Countdown event={config} />)
      expect(container.firstChild).toBeNull()
    })

    it('should render custom countdown title and subtitle', () => {
      const config = {
        ...mockEventConfig,
        countdownTitle: 'Custom Title',
        countdownSubtitle: 'Custom Subtitle',
      }
      render(<Countdown event={config} />)
      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.getByText('Custom Subtitle')).toBeInTheDocument()
    })
  })
})
