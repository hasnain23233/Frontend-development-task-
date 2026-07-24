import React, { memo, useCallback } from 'react'
import type { Product } from '../../types/product.types'
import ColorSwatch from './ColorSwatch'
import QuantityStepper from './QuantityStepper'
import PriceTag from './PriceTag'

interface ProductCardProps {
    product: Product
    selectedColorId: string | null
    quantity: number
    onSelectColor: (productId: string, colorId: string) => void
    onIncrement: (productId: string) => void
    onDecrement: (productId: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    selectedColorId,
    quantity,
    onSelectColor,
    onIncrement,
    onDecrement,
}) => {
    const isSelected = quantity > 0

    const handleSelectColor = useCallback(
        (colorId: string) => onSelectColor(product.id, colorId),
        [onSelectColor, product.id]
    )
    const handleIncrement = useCallback(
        () => onIncrement(product.id),
        [onIncrement, product.id]
    )
    const handleDecrement = useCallback(
        () => onDecrement(product.id),
        [onDecrement, product.id]
    )

    return (
        <div
            className={`relative flex gap-4 rounded-xl border-2 bg-white p-4 transition-colors
        ${isSelected ? ' border-[#6C4EF7]' : 'border-transparent'}`}
        >
            <div>
                {product.badge && (
                    <span className=' rounded-full bg-[#3D2E9E] px-2.5 py-1 text-[10px] font-semibold text-white'>
                        {product.badge}
                    </span>
                )}

                <img
                    src={product.image}
                    alt={product.name}
                    className='h-full w-28 shrink-0 object-contain'
                    loading='lazy'
                />
            </div>

            <div className='flex min-w-0 flex-1 flex-col gap-2'>
                <div>
                    <h3 className='text-xl font-semibold  text-[#1F1F1F]'>
                        {product.name}
                    </h3>
                    <p className='mt-0.5  text-[#6B6B6B]'>
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

                <div className='mt-auto flex items-end justify-between pt-1'>
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

// Custom comparator keeps re-renders scoped to the product whose
// selection actually changed, rather than the whole grid.
const areEqual = (prev: ProductCardProps, next: ProductCardProps) =>
    prev.product === next.product &&
    prev.selectedColorId === next.selectedColorId &&
    prev.quantity === next.quantity

export default memo(ProductCard, areEqual)
