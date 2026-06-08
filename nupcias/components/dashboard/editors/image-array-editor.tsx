import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash } from 'lucide-react'

interface ImageArrayEditorProps {
  images: string[]
  onChange: (images: string[]) => void
  label: string
  placeholder?: string
}

export function ImageArrayEditor({
  images,
  onChange,
  label,
  placeholder = 'https://...',
}: ImageArrayEditorProps) {
  const handleAdd = () => {
    onChange([...images, ''])
  }

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      {images.map((image, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={image}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleRemove(index)}
            className="hover:bg-destructive/60"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={handleAdd} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Agregar imagen
      </Button>
    </div>
  )
}
