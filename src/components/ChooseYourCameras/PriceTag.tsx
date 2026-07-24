import React, { memo } from 'react'
import type { ProductPricing } from '../../types/product.types'
import { formatCurrency } from '../../utils/formatCurrency'

interface PriceTagProps {
  pricing: ProductPricing
}

const PriceTag: React.FC<PriceTagProps> = ({ pricing }) => {
  const { original, sale } = pricing

  return (
    <div className='flex flex-col items-end leading-tight'>
      {original !== null && (
        <span className='text-xs text-red-500 line-through'>
          {formatCurrency(original)}
        </span>
      )}
      <span className='text-sm font-semibold text-[#484848]'>
        {formatCurrency(sale)}
      </span>
    </div>
  )
}

export default memo(PriceTag)
