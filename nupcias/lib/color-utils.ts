import type { ColorConfig } from '@/types/event'

export function getColorStyle(colorConfig?: ColorConfig): React.CSSProperties {
  if (!colorConfig) return {}

  const style: React.CSSProperties = {}

  if (colorConfig.background) {
    style.backgroundColor = colorConfig.background
  }

  if (colorConfig.text) {
    style.color = colorConfig.text
  }

  if (colorConfig.accent) {
    style.accentColor = colorConfig.accent
  }

  return style
}
