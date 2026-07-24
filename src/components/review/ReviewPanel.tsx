import React from 'react'
import { useBundle } from './../../context/useBundle'
import { formatCurrency } from './../../utils/formatCurrency'
import type { Product, ProductCategory } from './../../types/product.types'

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  camera: 'Cameras',
  sensor: 'Sensors',
  accessory: 'Accessories',
}

const CATEGORY_ORDER: ProductCategory[] = ['camera', 'sensor', 'accessory']

const ReviewPanel = () => {
  const {
    products,
    selection,
    increment,
    decrement,
    totalQuantity,
    subtotal,
    plan,
    shippingCost,
  } = useBundle()

  const selected = products.filter(
    (p) => (selection[p.id]?.quantity ?? 0) > 0
  )

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: selected.filter((p) => p.category === category),
  })).filter((g) => g.items.length > 0)

  const planTotal = subtotal + plan.salePrice + shippingCost
  const originalTotal = subtotal + plan.originalPrice + 5.99 // assumes $5.99 is shipping's original price
  const savings = originalTotal - planTotal

  return (
    <div className='rounded-2xl border border-gray-200 bg-[#EDF4FF] p-4'>
      <p className='text-xs font-semibold tracking-wide text-gray-400'>REVIEW</p>

      <h1 className='mt-1 text-2xl font-bold text-[#1F1F1F]'>Your security system</h1>
      <p className='mt-1 text-sm text-gray-500'>
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {grouped.map(({ category, items }) => (
        <div key={category} className='mt-5 border-t border-gray-300 pt-3'>
          <p className='text-xs font-semibold tracking-wide text-gray-400'>
            {CATEGORY_LABELS[category].toUpperCase()}
          </p>
          <ul className='mt-2 flex flex-col gap-3'>
            {items.map((product) => (
              <ReviewLineItem
                key={product.id}
                product={product}
                quantity={selection[product.id]?.quantity ?? 0}
                onIncrement={() => increment(product.id)}
                onDecrement={() => decrement(product.id)}
              />
            ))}
          </ul>
        </div>
      ))}

      {/* PLAN */}
      <div className='mt-5 flex items-center justify-between border-t border-gray-300 pt-3'>
        <p className='text-xs font-semibold tracking-wide text-gray-400'>PLAN</p>
      </div>
      <div className='mt-2 flex items-center justify-between'>
        <span className='font-semibold text-[#1F1F1F]'>
          Cam <span className='text-[#4E2FD2]'>Unlimited</span>
        </span>
        <div className='text-right text-sm'>
          <p className='text-gray-400 line-through'>{formatCurrency(plan.originalPrice)}/mo</p>
          <p className='font-semibold text-[#4E2FD2]'>{formatCurrency(plan.salePrice)}/mo</p>
        </div>
      </div>

      {/* SHIPPING */}
      <div className='mt-4 flex items-center justify-between'>
        <span className='text-[#1F1F1F]'>Fast Shipping</span>
        <div className='text-right text-sm'>
          <p className='text-gray-400 line-through'>{formatCurrency(5.99)}</p>
          <p className='font-semibold text-green-600'>FREE</p>
        </div>
      </div>

      {/* TOTAL / CHECKOUT */}
      <div className='mt-4 rounded-xl border-2 border-green-500 p-4'>
        <div className='flex justify-between text-sm text-gray-500'>
          <span>as low as {formatCurrency(19.19)}/mo</span>
        </div>
        <div className='mt-1 flex items-baseline gap-2'>
          <span className='text-gray-400 line-through'>{formatCurrency(originalTotal)}</span>
          <span className='text-2xl font-bold text-[#1F1F1F]'>{formatCurrency(planTotal)}</span>
        </div>
        <p className='mt-1 text-sm font-medium text-green-600'>
          Congrats! You're saving {formatCurrency(savings)} on your security bundle!
        </p>

        <button
          type='button'
          className='mt-4 w-full rounded-lg bg-[#4E2FD2] py-3 font-semibold text-white hover:bg-[#4526b8]'
        >
          Checkout
        </button>
        <button type='button' className='mt-2 w-full text-center text-sm text-gray-500 underline'>
          Save my system for later
        </button>
      </div>
    </div>
  )
}

const ReviewLineItem: React.FC<{
  product: Product
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
}> = ({ product, quantity, onIncrement, onDecrement }) => {
  const lineTotal = quantity * product.pricing.sale
  const originalLineTotal = product.pricing.original
    ? quantity * product.pricing.original
    : null

  return (
    <li className='flex items-center justify-between gap-3'>
      <div className='flex items-center gap-3'>
        <img src={product.image} alt={product.name} className='h-10 w-10 object-contain' />
        <span className='text-sm font-medium text-[#1F1F1F]'>{product.name}</span>
      </div>

      <div className='flex items-center gap-3'>
        {product.isRequired ? (
          <span className='text-sm text-gray-400'>{quantity}</span>
        ) : (
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={onDecrement}
              className='h-6 w-6 rounded-md bg-gray-200 text-gray-600'
            >
              −
            </button>
            <span className='w-4 text-center text-sm'>{quantity}</span>
            <button
              type='button'
              onClick={onIncrement}
              className='h-6 w-6 rounded-md bg-gray-200 text-gray-600'
            >
              +
            </button>
          </div>
        )}

        <div className='text-right text-sm'>
          {originalLineTotal !== null && (
            <p className='text-gray-400 line-through'>{formatCurrency(originalLineTotal)}</p>
          )}
          <p className={product.isRequired ? 'font-semibold text-green-600' : 'font-semibold text-[#4E2FD2]'}>
            {product.isRequired ? 'FREE' : formatCurrency(lineTotal)}
          </p>
        </div>
      </div>
    </li>
  )
}

export default ReviewPanel