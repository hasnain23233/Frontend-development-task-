import React, { memo, useCallback } from 'react'
import type { Product } from '../../types/product.types'
import ColorSwatch from './ColorSwatch'
import QuantityStepper from './QuantityStepper'
import PriceTag from './PriceTag'

interface ProductCardProps {
  product: Product
  selectedColorId: string | null
  quantity: number
  isSelected: boolean
  onSelectColor: (productId: string, colorId: string) => void
  onIncrement: () => void
  onDecrement: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedColorId,
  quantity,
  isSelected,
  onSelectColor,
  onIncrement,
  onDecrement,
}) => {
  const handleSelectColor = useCallback(
    (colorId: string) => onSelectColor(product.id, colorId),
    [onSelectColor, product.id],
  )
  const handleIncrement = useCallback(() => onIncrement(), [onIncrement])
  const handleDecrement = useCallback(() => onDecrement(), [onDecrement])

  return (
    <div
      className={`relative flex gap-3 rounded-xl border-2 bg-white p-3 transition-colors sm:gap-4 sm:p-4
        ${isSelected ? 'border-[#6C4EF7]' : 'border-transparent'}`}
    >
      <div>
        {product.badge && (
          <span className='rounded-full bg-[#4E2FD2] px-2 py-0.5 text-[10px] font-semibold text-white sm:px-2.5 sm:py-1 sm:text-[12px]'>
            {product.badge}
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          className='h-full w-20 shrink-0 object-contain sm:w-28'
          loading='lazy'
        />
      </div>

      <div className='flex min-w-0 flex-1 flex-col gap-2'>
        <div>
          <h3 className='text-base font-semibold text-[#1F1F1F] sm:text-xl'>{product.name}</h3>
          <p className='mt-0.5 text-sm text-[#6B6B6B] sm:text-base'>
            {product.description}{' '}
            <a
              href={product.learnMoreUrl}
              target='_blank'
              rel='noreferrer'
              className='font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700'
            >
              Learn More
            </a>
          </p>
        </div>

        {product.colors.length > 0 && (
          <div className='flex flex-wrap gap-2' role='radiogroup' aria-label={`${product.name} color`}>
            {product.colors.map((color) => (
              <ColorSwatch
                key={color.id}
                color={color}
                isSelected={selectedColorId === color.id}
                onSelect={handleSelectColor}
              />
            ))}
          </div>
        )}

        <div className='mt-auto flex flex-wrap items-end justify-between gap-2 pt-1'>
          <QuantityStepper
            quantity={quantity}
            productName={product.name}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <PriceTag pricing={product.pricing} />
        </div>
      </div>
    </div>
  )
}

const areEqual = (prev: ProductCardProps, next: ProductCardProps) =>
  prev.product === next.product &&
  prev.selectedColorId === next.selectedColorId &&
  prev.quantity === next.quantity &&
  prev.isSelected === next.isSelected

export default memo(ProductCard, areEqual)