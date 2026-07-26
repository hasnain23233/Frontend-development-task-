import { ShieldCheck } from 'lucide-react'
import { useBundle } from './../../context/useBundle'
import { formatCurrency } from './../../utils/formatCurrency'
import type { ProductCategory } from './../../types/product.types'

interface LineItem {
  id: string
  productId: string
  variantId: string
  variantName: string | null
  image: string
  name: string
  pricing: {
    original: number | null
    sale: number
  }
  quantity: number
  category: ProductCategory
}

interface ReviewLineItemProps {
  item: LineItem
  onIncrement: () => void
  onDecrement: () => void
}

const CATEGORY_ORDER: ProductCategory[] = ['camera', 'sensor', 'accessory']

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  camera: 'Cameras',
  sensor: 'Sensors',
  accessory: 'Accessories',
}

const ReviewLineItem: React.FC<ReviewLineItemProps> = ({ item, onIncrement, onDecrement }) => {
  const lineTotal = item.quantity * item.pricing.sale
  const originalLineTotal = item.pricing.original ? item.quantity * item.pricing.original : null
  const displayName = item.variantName ? `${item.name} — ${item.variantName}` : item.name

  return (
    <li className='flex  items-center justify-between gap-3 rounded-2xl bg-transparent p-2 shadow-sm sm:p-3'>
      <div className='flex items-center gap-3'>
        <img
          src={item.image}
          alt={displayName}
          className='h-12 w-12 shrink-0 rounded-lg bg-white p-1 object-contain sm:h-16 sm:w-16'
        />
        <p className='text-sm font-medium text-[#1F1F1F]'>{displayName}</p>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={onDecrement}
            className='flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8'
            disabled={item.quantity <= 0}
            aria-label={`Decrease ${displayName} quantity`}
          >
            −
          </button>
          <span className='w-6 text-center text-sm font-medium text-[#1F1F1F]'>{item.quantity}</span>
          <button
            type='button'
            onClick={onIncrement}
            className='flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-600 transition hover:bg-gray-100 sm:h-8 sm:w-8'
            aria-label={`Increase ${displayName} quantity`}
          >
            +
          </button>
        </div>

        <div className='text-right text-sm'>
          {originalLineTotal !== null && (
            <p className='text-gray-400 line-through'>{formatCurrency(originalLineTotal)}</p>
          )}
          <p className='font-semibold text-[#4E2FD2]'>{formatCurrency(lineTotal)}</p>
        </div>
      </div>
    </li>
  )
}

const ReviewPanel = () => {
  const {
    selectedLineItems,
    selectedPlan,
    shippingCost,
    total,
    originalTotal,
    savings,
    increment,
    decrement,
    saveBundle,
    saved,
  } = useBundle()

  const groupedLineItems = CATEGORY_ORDER.map((category) => ({
    category,
    items: selectedLineItems.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0)

  const monthlyFinancingEstimate = Math.max(1, total / 12)

  return (
    <div className=' rounded-2xl bg-[#EDF4FF] p-3 w-full  sm:p-4'>
      <p className='text-xs font-semibold tracking-wide text-gray-500'>REVIEW</p>

      <h1 className='mt-2 font-gilroy text-xl text-[#1F1F1F] sm:text-2xl'>Your security system</h1>
      <p className='font-gilroy-medium mt-1 w-full text-sm text-gray-500 lg:w-9/12 lg:text-base'>
        Review your personalized protection system designed to keep what matters most safe.
      </p>

      {groupedLineItems.map(({ category, items }) => (
        <div key={category} className='mt-5 border-t border-gray-300 pt-3'>
          <p className='text-xs font-semibold tracking-wide text-gray-400'>
            {CATEGORY_LABELS[category].toUpperCase()}
          </p>
          <ul className='mt-2 flex flex-col gap-3'>
            {items.map((item) => (
              <ReviewLineItem
                key={item.id}
                item={item}
                onIncrement={() => increment(item.productId, item.variantId)}
                onDecrement={() => decrement(item.productId, item.variantId)}
              />
            ))}
          </ul>
        </div>
      ))}

      <div className='mt-5 border-t border-gray-300 pt-3'>
        <p className='text-xs font-semibold tracking-wide text-gray-400'>PLAN</p>
        <div className='mt-3 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='font-semibold text-[#1F1F1F]'>{selectedPlan.name}</p>
            <p className='text-sm text-gray-500'>{selectedPlan.description}</p>
          </div>
          <div className='text-right text-sm'>
            {selectedPlan.originalPrice !== null && (
              <p className='text-gray-400 line-through'>{formatCurrency(selectedPlan.originalPrice)}/mo</p>
            )}
            <p className='font-semibold text-[#4E2FD2]'>{formatCurrency(selectedPlan.salePrice)}/mo</p>
          </div>
        </div>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <span className='text-[#1F1F1F]'>Fast Shipping</span>
        <div className='text-right text-sm'>
          <p className='text-gray-400 line-through'>{formatCurrency(shippingCost)}</p>
          <p className='font-semibold text-green-600'>FREE</p>
        </div>
      </div>

      <div className='mt-4 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-sm'>
        <ShieldCheck size={18} className='shrink-0 text-green-600' />
        <p className='text-sm font-medium text-[#1F1F1F]'>30-day satisfaction guarantee</p>
      </div>

      <div className='mt-3 text-sm text-gray-500'>
        Financing available on approved credit. Stay protected without paying it all up front.
      </div>

      <div className='mt-4 rounded-xl border-2 border-green-500 bg-white p-4'>
        <div className='flex justify-between text-sm text-gray-500'>
          <span>as low as {formatCurrency(monthlyFinancingEstimate)}/mo</span>
        </div>
        <div className='mt-1 flex flex-wrap items-baseline gap-2'>
          <span className='text-gray-400 line-through'>{formatCurrency(originalTotal)}</span>
          <span className='text-xl font-bold text-[#1F1F1F] sm:text-2xl'>{formatCurrency(total)}</span>
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
        <button
          type='button'
          onClick={saveBundle}
          className='mt-2 w-full text-center text-sm text-gray-500 underline'
        >
          {saved ? 'Saved for later' : 'Save my system for later'}
        </button>
      </div>
    </div>
  )
}

export default ReviewPanel