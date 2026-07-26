import { useState } from 'react'
import {
  ArrowRight,
  Camera,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Package,
  ShieldCheck,
} from 'lucide-react'
import ProductCard from './ProductCard'
import { useBundle } from './../../context/useBundle'
import { formatCurrency } from '../../utils/formatCurrency'
import type { ProductCategory } from '../../types/product.types'

interface WizardStep {
  id: string
  title: string
  description: string
  Icon: typeof Camera
  category?: ProductCategory
}

interface VariantProduct {
  id: string
  colors: { id: string }[]
  defaultColorId: string | null
}

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'cameras',
    title: 'Choose your cameras',
    description: 'Select the right cameras to protect every angle of your home.',
    Icon: Camera,
    category: 'camera',
  },
  {
    id: 'plan',
    title: 'Choose your plan',
    description: 'Pick the plan that best fits your home and monitoring needs.',
    Icon: CreditCard,
  },
  {
    id: 'sensors',
    title: 'Choose your sensors',
    description: 'Add door, window, and motion sensors for smarter alerts.',
    Icon: ShieldCheck,
    category: 'sensor',
  },
  {
    id: 'extras',
    title: 'Add extra protection',
    description: 'Complete your system with accessories for extra safety.',
    Icon: Package,
    category: 'accessory',
  },
]

const STEP_ORDER = WIZARD_STEPS.map((step) => step.id)

const getDefaultVariantId = (product: VariantProduct) =>
  product.defaultColorId ?? product.colors[0]?.id ?? 'default'

const ChooseYourCameras = () => {
  const [openStepId, setOpenStepId] = useState<string | null>(WIZARD_STEPS[0].id)

  const {
    products,
    plans,
    selectedPlanId,
    selectPlan,
    selection,
    activeVariantByProduct,
    setActiveVariant,
    increment,
    decrement,
    selectedCounts,
  } = useBundle()

  const getProductsForCategory = (category: ProductCategory) =>
    products.filter((product) => product.category === category)

  const getSelectedCountForStep = (step: WizardStep) =>
    step.id === 'plan' ? selectedCounts.plan : selectedCounts[step.category ?? 'camera']

  const goToStep = (stepId: string) =>
    setOpenStepId((currentStepId) => (currentStepId === stepId ? null : stepId))

  const goToNextStep = (currentIndex: number) => setOpenStepId(STEP_ORDER[currentIndex + 1])

  const renderPlanOptions = () => (
    <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {plans.map((plan) => {
        const isSelected = plan.id === selectedPlanId

        return (
          <button
            key={plan.id}
            type='button'
            onClick={() => selectPlan(plan.id)}
            className={`w-full rounded-3xl border p-4 text-left transition sm:p-5 ${
              isSelected
                ? 'border-[#4E2FD2] bg-[#EEF4FF] shadow-sm'
                : 'border-gray-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-start sm:gap-4'>
              <div>
                <div className='flex flex-wrap items-center gap-2'>
                  <h3 className='text-base font-semibold text-slate-900 sm:text-lg'>{plan.name}</h3>
                  {plan.badge ? (
                    <span className='rounded-full bg-[#E7ECFF] px-2.5 py-1 text-[11px] font-semibold text-[#3C4BDC]'>
                      {plan.badge}
                    </span>
                  ) : null}
                </div>
                <p className='mt-2 text-sm text-slate-500'>{plan.description}</p>
              </div>
              <div className='text-left sm:text-right'>
                {plan.originalPrice !== null && (
                  <p className='text-xs text-slate-400 line-through'>
                    {formatCurrency(plan.originalPrice)}/mo
                  </p>
                )}
                <p className='mt-1 text-lg font-semibold text-slate-900 sm:text-xl'>
                  {formatCurrency(plan.salePrice)}/mo
                </p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )

  const renderProductOptions = (category: ProductCategory) => (
    <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {getProductsForCategory(category).map((product) => {
        const activeVariantId = activeVariantByProduct[product.id] ?? getDefaultVariantId(product)
        const quantity = selection[product.id]?.quantities?.[activeVariantId] ?? 0
        const hasAnyQuantity = Object.values(selection[product.id]?.quantities ?? {}).some(
          (qty) => qty > 0,
        )

        return (
          <ProductCard
            key={product.id}
            product={product}
            selectedColorId={activeVariantId}
            quantity={quantity}
            isSelected={hasAnyQuantity}
            onSelectColor={setActiveVariant}
            onIncrement={() => increment(product.id, activeVariantId)}
            onDecrement={() => decrement(product.id, activeVariantId)}
          />
        )
      })}
    </div>
  )

  return (
    <div className='w-full rounded-3xl shadow-sm'>
      {WIZARD_STEPS.map((step, index) => {
        const isOpen = step.id === openStepId
        const selectedCount = getSelectedCountForStep(step)
        const StepIcon = step.Icon
        const isLastStep = index === WIZARD_STEPS.length - 1

        return (
          <div
            key={step.id}
            className={`rounded-3xl transition-colors ${isOpen ? 'bg-[#F8FBFF]' : 'bg-white'}`}
          >
            <p className='px-4 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 sm:px-5 sm:py-4'>
              Step {index + 1} of {WIZARD_STEPS.length}
            </p>
            <button
              type='button'
              onClick={() => goToStep(step.id)}
              className='flex w-full items-center justify-between gap-3 border-y border-gray-900 px-4 py-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E2FD2] sm:gap-4 sm:px-5 sm:py-4'
            >
              <div className='flex items-center gap-2 sm:gap-3'>
                <span className='inline-flex h-9 w-9 items-center justify-center text-slate-700 sm:h-11 sm:w-11'>
                  <StepIcon className='h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7' />
                </span>
                <div>
                  <h2 className='mt-1 font-gilroy text-base text-slate-900 sm:text-xl lg:text-2xl'>
                    {step.title}
                  </h2>
                </div>
              </div>
              <div className='flex items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm'>
                <span>{selectedCount} selected</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {isOpen && (
              <div className='border-t border-gray-200 bg-[#F8FBFF] px-4 py-4 sm:px-5 sm:py-5'>
                <p className='font-gilroy-medium max-w-2xl text-sm leading-6 text-slate-600'>
                  {step.description}
                </p>

                {step.id === 'plan' ? renderPlanOptions() : renderProductOptions(step.category!)}

                {!isLastStep && (
                  <div className='mt-6 flex justify-end'>
                    <button
                      type='button'
                      onClick={() => goToNextStep(index)}
                      className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4E2FD2] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3b29b2] sm:w-auto sm:justify-start'
                    >
                      Next: {WIZARD_STEPS[index + 1].title}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChooseYourCameras