export interface FontOption {
  id: string
  name: string
  family: string
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting'
  googleFont?: string
}

export const availableFonts: FontOption[] = [
  // Serif fonts
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    family: 'Playfair Display',
    category: 'serif',
    googleFont: 'Playfair Display:wght@400;500;600;700',
  },
  {
    id: 'lora',
    name: 'Lora',
    family: 'Lora',
    category: 'serif',
    googleFont: 'Lora:wght@400;500;600;700',
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    family: 'Merriweather',
    category: 'serif',
    googleFont: 'Merriweather:wght@300;400;700;900',
  },
  {
    id: 'cormorant',
    name: 'Cormorant',
    family: 'Cormorant',
    category: 'serif',
    googleFont: 'Cormorant:wght@300;400;600;700',
  },
  // Sans-serif fonts
  {
    id: 'inter',
    name: 'Inter',
    family: 'Inter',
    category: 'sans-serif',
    googleFont: 'Inter:wght@300;400;500;600;700',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    family: 'Poppins',
    category: 'sans-serif',
    googleFont: 'Poppins:wght@300;400;500;600;700',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat',
    category: 'sans-serif',
    googleFont: 'Montserrat:wght@300;400;500;600;700',
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    family: 'Open Sans',
    category: 'sans-serif',
    googleFont: 'Open Sans:wght@300;400;500;600;700',
  },
  // Display fonts
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    family: 'Dancing Script',
    category: 'handwriting',
    googleFont: 'Dancing Script:wght@400;500;600;700',
  },
  {
    id: 'great-vibes',
    name: 'Great Vibes',
    family: 'Great Vibes',
    category: 'handwriting',
    googleFont: 'Great Vibes:wght@400',
  },
  {
    id: 'pacifico',
    name: 'Pacifico',
    family: 'Pacifico',
    category: 'handwriting',
    googleFont: 'Pacifico:wght@400',
  },
  {
    id: 'satisfy',
    name: 'Satisfy',
    family: 'Satisfy',
    category: 'handwriting',
    googleFont: 'Satisfy:wght@400',
  },
]

export function getGoogleFontsURL(fontIds: string[]): string {
  const fonts = availableFonts.filter(f => fontIds.includes(f.id) && f.googleFont)
  const fontFamilies = fonts.map(f => f.googleFont).join('&')
  return `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`
}

export function getFontById(id: string): FontOption | undefined {
  return availableFonts.find(f => f.id === id)
}
