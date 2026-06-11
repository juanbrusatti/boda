import type { EventColors } from '@/types/event'

export const defaultColors: Record<string, EventColors> = {
  wedding: {
    hero: {
      colors: {
        background: '#1a1a1a',
        text: '#f7f4ee',
        accent: '#d4af37',
      },
    },
    countdown: {
      colors: {
        background: '#1a1a1a',
        text: '#f7f4ee',
        accent: '#d4af37',
      },
    },
    story: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a',
        accent: '#8b7355',
      },
    },
    gallery: {
      colors: {
        background: '#f5f5f5',
        text: '#1a1a1a',
        accent: '#d4af37',
      },
    },
    location: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a',
        accent: '#8b7355',
      },
    },
    rsvp: {
      colors: {
        background: '#1a1a1a',
        text: '#f7f4ee',
        accent: '#d4af37',
      },
    },
    footer: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a',
        accent: '#d4af37',
      },
    },
  },
  birthday: {
    hero: {
      colors: {
        background: '#fef3c7',
        text: '#1a1a1a',
        accent: '#f59e0b',
      },
    },
    countdown: {
      colors: {
        background: '#f59e0b',
        text: '#ffffff',
        accent: '#fef3c7',
      },
    },
    story: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a',
        accent: '#f59e0b',
      },
    },
    gallery: {
      colors: {
        background: '#fef3c7',
        text: '#1a1a1a',
        accent: '#f59e0b',
      },
    },
    location: {
      colors: {
        background: '#ffffff',
        text: '#1a1a1a',
        accent: '#f59e0b',
      },
    },
    rsvp: {
      colors: {
        background: '#fef3c7',
        text: '#1a1a1a',
        accent: '#f59e0b',
      },
    },
    footer: {
      colors: {
        background: '#f59e0b',
        text: '#ffffff',
        accent: '#fef3c7',
      },
    },
  },
  quinceanera: {
    hero: {
      colors: {
        background: '#fce7f3',
        text: '#1a1a1a',
        accent: '#ec4899',
      },
    },
    countdown: {
      colors: {
        background: '#fce7f3',
        text: '#1a1a1a',
        accent: '#ec4899',
      },
    },
    story: {
      colors: {
        background: '#faf5ff',
        text: '#1a1a1a',
        accent: '#ec4899',
      },
    },
    gallery: {
      colors: {
        background: '#fce7f3',
        text: '#1a1a1a',
        accent: '#ec4899',
      },
    },
    location: {
      colors: {
        background: '#fce7f3',
        text: '#1a1a1a',
        accent: '#ec4899',
      },
    },
    rsvp: {
      colors: {
        background: '#ec4899',
        text: '#ffffff',
        accent: '#fce7f3',
      },
    },
    footer: {
      colors: {
        background: '#7c3aed',
        text: '#ffffff',
        accent: '#fce7f3',
      },
    },
  },
}

export function getDefaultColors(templateId: string): EventColors {
  return defaultColors[templateId] || defaultColors.wedding
}
