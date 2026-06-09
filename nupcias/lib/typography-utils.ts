import type { TypographyConfig } from '@/types/event'

export function getTypographyStyle(config?: TypographyConfig): React.CSSProperties {
  if (!config) return {}

  return {
    fontFamily: config.fontFamily,
    fontWeight: config.fontWeight,
    fontStyle: config.fontStyle,
    color: config.color,
  }
}

export function getTypographyClassName(config?: TypographyConfig): string {
  if (!config) return ''

  const classes: string[] = []

  if (config.fontWeight) {
    const weightMap: Record<number, string> = {
      100: 'font-thin',
      200: 'font-extralight',
      300: 'font-light',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
      800: 'font-extrabold',
      900: 'font-black',
    }
    const weightClass = weightMap[config.fontWeight]
    if (weightClass) {
      classes.push(weightClass)
    }
  }

  if (config.fontStyle === 'italic') {
    classes.push('italic')
  }

  return classes.join(' ')
}
