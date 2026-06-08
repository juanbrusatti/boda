import { describe, it, expect, vi, beforeEach } from 'vitest'
import { saveEventConfig, getEventConfig, hasEventConfig, deleteEventConfig, setEventPublished, getPublicEventConfig } from '@/services/events'
import type { EventConfig } from '@/types/event'

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(() => mockSupabase),
  select: vi.fn(() => mockSupabase),
  eq: vi.fn(() => mockSupabase),
  single: vi.fn(() => mockSupabase),
  insert: vi.fn(() => mockSupabase),
  update: vi.fn(() => mockSupabase),
  delete: vi.fn(() => mockSupabase),
  upsert: vi.fn(() => mockSupabase),
  limit: vi.fn(() => mockSupabase),
} as any

vi.mock('@/lib/supabase-server', () => ({
  createServerSupabaseClient: vi.fn(() => mockSupabase),
}))

describe('saveEventConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should upsert event config successfully', async () => {
    const mockConfig: EventConfig = {
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

    const mockResult = {
      id: '123',
      tenant_id: 'tenant-1',
      user_id: 'user-1',
      template_id: 'template-1',
      config: mockConfig,
      is_published: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      tenants: { slug: 'test-slug' },
    }

    mockSupabase.upsert.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: mockResult, error: null })

    const result = await saveEventConfig('user-1', 'tenant-1', 'template-1', mockConfig)

    expect(result).toEqual(mockResult)
    expect(mockSupabase.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        tenant_id: 'tenant-1',
        user_id: 'user-1',
        template_id: 'template-1',
        config: mockConfig,
      }),
      { onConflict: 'user_id,tenant_id' }
    )
  })

  it('should throw error when upsert fails', async () => {
    const mockConfig: EventConfig = {
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

    mockSupabase.upsert.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Database error' } })

    await expect(saveEventConfig('user-1', 'tenant-1', 'template-1', mockConfig)).rejects.toThrow(
      'Failed to save event config: Database error'
    )
  })
})

describe('getEventConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return event config when found', async () => {
    const mockConfig = {
      id: '123',
      tenant_id: 'tenant-1',
      user_id: 'user-1',
      template_id: 'template-1',
      config: {} as EventConfig,
      is_published: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      tenants: { slug: 'test-slug' },
    }

    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: mockConfig, error: null })

    const result = await getEventConfig('user-1', 'tenant-1')

    expect(result).toEqual(mockConfig)
  })

  it('should return null when not found', async () => {
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: null, error: { code: 'PGRST116' } })

    const result = await getEventConfig('user-1', 'tenant-1')

    expect(result).toBeNull()
  })

  it('should throw error on other errors', async () => {
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Database error' } })

    await expect(getEventConfig('user-1', 'tenant-1')).rejects.toThrow('Failed to fetch event config: Database error')
  })
})

describe('hasEventConfig', () => {
  it('should return true when config exists', async () => {
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: { id: '123' }, error: null })

    const result = await hasEventConfig('user-1', 'tenant-1')

    expect(result).toBe(true)
  })

  it('should return false when config does not exist', async () => {
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: null, error: { code: 'PGRST116' } })

    const result = await hasEventConfig('user-1', 'tenant-1')

    expect(result).toBe(false)
  })
})

describe('setEventPublished', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should update publish status successfully', async () => {
    mockSupabase.update.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: { id: '123' }, error: null })

    await expect(setEventPublished('user-1', 'tenant-1', true)).resolves.not.toThrow()
    expect(mockSupabase.update).toHaveBeenCalledWith({ is_published: true, updated_at: expect.any(String) })
  })

  it('should throw error when update fails', async () => {
    mockSupabase.update.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.single.mockResolvedValue({ data: null, error: { message: 'Database error' } })

    await expect(setEventPublished('user-1', 'tenant-1', true)).rejects.toThrow('Failed to update publish status: Database error')
  })
})

describe('getPublicEventConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return public event config when found', async () => {
    const mockConfig = {
      id: '123',
      tenant_id: 'tenant-1',
      user_id: 'user-1',
      template_id: 'template-1',
      config: {} as EventConfig,
      is_published: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      tenants: { slug: 'test-slug', is_active: true },
    }

    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.limit.mockResolvedValue({ data: [mockConfig], error: null })

    const result = await getPublicEventConfig('test-slug')

    expect(result).toEqual(mockConfig)
  })

  it('should return null when not found', async () => {
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.limit.mockResolvedValue({ data: [], error: null })

    const result = await getPublicEventConfig('test-slug')

    expect(result).toBeNull()
  })

  it('should throw error on multiple configs found', async () => {
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.limit.mockResolvedValue({ data: [{ id: '1' }, { id: '2' }], error: null })

    await expect(getPublicEventConfig('test-slug')).rejects.toThrow('Multiple event configurations found for tenant')
  })
})
