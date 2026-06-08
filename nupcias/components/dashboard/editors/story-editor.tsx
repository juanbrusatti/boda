import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TextArrayEditor } from './text-array-editor'
import { ImageArrayEditor } from './image-array-editor'
import { TypographySelector } from './typography-selector'
import { ColorSelector } from './color-selector'
import type { EventConfig } from '@/types/event'

interface StoryEditorProps {
  data: EventConfig
  onDataChange: (data: EventConfig) => void
}

export function StoryEditor({ data, onDataChange }: StoryEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuestra historia</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="showStory">Mostrar sección</Label>
          <input
            type="checkbox"
            id="showStory"
            checked={data.showStory !== false}
            onChange={(e) => onDataChange({ ...data, showStory: e.target.checked })}
            className="h-4 w-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storySubtitle">Título grande</Label>
          <Input
            id="storySubtitle"
            value={data.storySubtitle || ''}
            onChange={(e) => onDataChange({ ...data, storySubtitle: e.target.value })}
            placeholder="Dos caminos que se vuelven uno"
          />
          <TypographySelector section="story" element="title" data={data} onDataChange={onDataChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storyTitle">Subtítulo pequeño</Label>
          <Input
            id="storyTitle"
            value={data.storyTitle || ''}
            onChange={(e) => onDataChange({ ...data, storyTitle: e.target.value })}
            placeholder="Nuestra historia"
          />
          <TypographySelector section="story" element="subtitle" data={data} onDataChange={onDataChange} />
        </div>

        <ImageArrayEditor
          images={data.storyImages || []}
          onChange={(images) => onDataChange({ ...data, storyImages: images })}
          label="Imágenes"
          placeholder="https://..."
        />

        <TextArrayEditor
          items={data.story?.map(p => p.text) || []}
          onChange={(texts) => onDataChange({ ...data, story: texts.map(text => ({ text })) })}
          label="Párrafos de la historia"
          placeholder="Escribe un párrafo de la historia..."
          textarea
          rows={4}
        />

        <div className="space-y-2">
          <Label>Tipografía del cuerpo</Label>
          <TypographySelector section="story" element="body" data={data} onDataChange={onDataChange} />
        </div>

        <div className="space-y-2">
          <Label>Colores de la sección</Label>
          <ColorSelector section="story" data={data} onDataChange={onDataChange} />
        </div>
      </CardContent>
    </Card>
  )
}
