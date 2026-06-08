import type { TypographyConfig } from '@/types/event'

export function getTypographyStyle(config?: TypographyConfig): React.CSSProperties {
  if (!config) return {}

  return {
    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight,
    fontStyle: config.fontStyle,
  }
}

export function getTypographyClassName(config?: TypographyConfig): string {
  if (!config) return ''

  const classes: string[] = []

  if (config.fontWeight) {
    classes.push(`font-${config.fontWeight}`)
  }

  if (config.fontStyle === 'italic') {
    classes.push('italic')
  }

  return classes.join(' ')
}
