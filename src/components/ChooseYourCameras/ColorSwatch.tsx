import React, { memo } from 'react'
import type { ProductColor } from '../../types/product.types'

interface ColorSwatchProps {
  color: ProductColor
  isSelected: boolean
  onSelect: (colorId: string) => void
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  isSelected,
  onSelect,
}) => {
  return (
    <button
      type='button'
      onClick={() => onSelect(color.id)}
      aria-pressed={isSelected}
      className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C4EF7] focus-visible:ring-offset-1
        ${
          isSelected
            ? 'border-teal-400 bg-teal-50/60 text-[#484848]'
            : 'border-gray-300 text-[#484848] hover:border-gray-400'
        }`}
    >
      <span
        className='h-3.5 w-3.5 shrink-0 rounded-full border border-black/10'
        style={{ backgroundColor: color.swatchColor }}
        aria-hidden='true'
      />
      {color.name}
    </button>
  )
}

export default memo(ColorSwatch)
