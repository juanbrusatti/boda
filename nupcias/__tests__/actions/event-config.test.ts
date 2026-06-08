import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getEventConfigAction, saveEventConfigAction, hasEventConfigAction, setEventPublishedAction } from '@/app/actions/event-config'
import * as events from '@/services/events'
import type { EventConfig } from '@/types/event'

// Mock the services
vi.mock('@/services/events', () => ({
  saveEventConfig: vi.fn(),
  getEventConfig: vi.fn(),
  hasEventConfig: vi.fn(),
  setEventPublished: vi.fn(),
}))

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

describe('getEventConfigAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return event config successfully', async () => {
    const mockConfig = {
      id: '123',
      tenant_id: 'tenant-1',
      user_id: 'user-1',
      template_id: 'template-1',
      config: mockEventConfig,
      is_published: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      tenants: { slug: 'test-slug' },
    }

    vi.mocked(events.getEventConfig).mockResolvedValue(mockConfig)

    const result = await getEventConfigAction({ userId: 'user-1', tenantId: 'tenant-1' })

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockConfig)
    expect(events.getEventConfig).toHaveBeenCalledWith('user-1', 'tenant-1')
  })

  it('should return error when getEventConfig throws', async () => {
    vi.mocked(events.getEventConfig).mockRejectedValue(new Error('Database error'))

    const result = await getEventConfigAction({ userId: 'user-1', tenantId: 'tenant-1' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Database error')
  })
})

describe('saveEventConfigAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should save event config successfully', async () => {
    const mockConfig = {
      id: '123',
      tenant_id: 'tenant-1',
      user_id: 'user-1',
      template_id: 'template-1',
      config: mockEventConfig,
      is_published: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      tenants: { slug: 'test-slug' },
    }

    vi.mocked(events.saveEventConfig).mockResolvedValue(mockConfig)

    const result = await saveEventConfigAction({
      userId: 'user-1',
      tenantId: 'tenant-1',
      templateId: 'template-1',
      config: mockEventConfig,
    })

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockConfig)
    expect(events.saveEventConfig).toHaveBeenCalledWith('user-1', 'tenant-1', 'template-1', mockEventConfig)
  })

  it('should return error when saveEventConfig throws', async () => {
    vi.mocked(events.saveEventConfig).mockRejectedValue(new Error('Database error'))

    const result = await saveEventConfigAction({
      userId: 'user-1',
      tenantId: 'tenant-1',
      templateId: 'template-1',
      config: mockEventConfig,
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Database error')
  })
})

describe('hasEventConfigAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return true when config exists', async () => {
    vi.mocked(events.hasEventConfig).mockResolvedValue(true)

    const result = await hasEventConfigAction({ userId: 'user-1', tenantId: 'tenant-1' })

    expect(result.success).toBe(true)
    expect(result.hasConfig).toBe(true)
  })

  it('should return false when config does not exist', async () => {
    vi.mocked(events.hasEventConfig).mockResolvedValue(false)

    const result = await hasEventConfigAction({ userId: 'user-1', tenantId: 'tenant-1' })

    expect(result.success).toBe(true)
    expect(result.hasConfig).toBe(false)
  })

  it('should return error when hasEventConfig throws', async () => {
    vi.mocked(events.hasEventConfig).mockRejectedValue(new Error('Database error'))

    const result = await hasEventConfigAction({ userId: 'user-1', tenantId: 'tenant-1' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Database error')
  })
})

describe('setEventPublishedAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should set published status successfully', async () => {
    vi.mocked(events.setEventPublished).mockResolvedValue(undefined)

    const result = await setEventPublishedAction({
      userId: 'user-1',
      tenantId: 'tenant-1',
      isPublished: true,
    })

    expect(result.success).toBe(true)
    expect(events.setEventPublished).toHaveBeenCalledWith('user-1', 'tenant-1', true)
  })

  it('should return error when setEventPublished throws', async () => {
    vi.mocked(events.setEventPublished).mockRejectedValue(new Error('Database error'))

    const result = await setEventPublishedAction({
      userId: 'user-1',
      tenantId: 'tenant-1',
      isPublished: true,
    })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Database error')
  })
})
