import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, Trash } from 'lucide-react'

interface TextArrayEditorProps {
  items: string[]
  onChange: (items: string[]) => void
  label: string
  placeholder?: string
  textarea?: boolean
  rows?: number
}

export function TextArrayEditor({
  items,
  onChange,
  label,
  placeholder = '',
  textarea = false,
  rows = 3,
}: TextArrayEditorProps) {
  const handleAdd = () => {
    onChange([...items, ''])
  }

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onChange(newItems)
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          {textarea ? (
            <Textarea
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
              rows={rows}
              className="flex-1"
            />
          ) : (
            <Input
              value={item}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
          )}
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
        Agregar
      </Button>
    </div>
  )
}
