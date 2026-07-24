import React, { memo } from 'react'
import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  quantity: number
  productName: string
  onIncrement: () => void
  onDecrement: () => void
  min?: number
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  productName,
  onIncrement,
  onDecrement,
  min = 0,
}) => {
  const isAtMin = quantity <= min

  return (
    <div className='flex items-center gap-3' role='group' aria-label={`${productName} quantity`}>
      <button
        type='button'
        onClick={onDecrement}
        disabled={isAtMin}
        aria-label={`Decrease ${productName} quantity`}
        className='flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-600
          transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E84B9C]'
      >
        <Minus size={14} />
      </button>

      <span className='w-4 text-center text-sm font-medium text-[#484848]' aria-live='polite'>
        {quantity}
      </span>

      <button
        type='button'
        onClick={onIncrement}
        aria-label={`Increase ${productName} quantity`}
        className='flex h-6 w-6 items-center justify-center rounded border border-gray-300 text-gray-600
          transition-colors hover:bg-gray-100
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C4EF7]'
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default memo(QuantityStepper)
