import React, { useId, useState } from 'react'
import { useProductSelection } from '../../hooks/useProductSelection'
import ProductCard from './ProductCard'
import { useBundle } from "./../../context/useBundle";
 

const ChooseYourCameras: React.FC = () => {
    
    const { products, selection, selectColor, increment, decrement, totalQuantity, subtotal } = useBundle()
     
 
    const [isOpen, setIsOpen] = useState(true)
    const panelId = useId()

    return (
        <div className={`w-full rounded-xl ${isOpen ? 'bg-[#EDF4FF]' : 'bg-white'}`}>
            <h1 className='border-b border-gray-400 p-2  text-sm font-semibold text-[#484848]'>
                Step 1 of 4
            </h1>

            <div className='flex flex-col items-center justify-center gap-4 p-4 flex-wrap sm:flex-row sm:justify-between sm:items-center'>
                <h1 className='text-xl  font-semibold text-[#484848] flex items-center gap-2'>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_68_9780)">
                            <path d="M8.6665 24.9166V20.5833" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.3335 24.9166V20.5833" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22.75 24.9167L3.25 24.9167" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 5.14581C15.2436 5.14581 17.0625 6.96473 17.0625 9.20831C17.0625 11.4519 15.2436 13.2708 13 13.2708C10.7564 13.2708 8.9375 11.4519 8.9375 9.20831C8.9375 6.96473 10.7564 5.14581 13 5.14581Z" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12.9731 16.25C12.7489 16.25 12.5669 16.432 12.5669 16.6562C12.5669 16.8805 12.7489 17.0625 12.9731 17.0625C13.1974 17.0625 13.3794 16.8805 13.3794 16.6562C13.3794 16.432 13.1974 16.25 12.9731 16.25Z" fill="#6F7882" stroke="#6F7882" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="3.1875" y="0.75" width="19.625" height="19.625" rx="3.25" stroke="#6F7882" strokeWidth="1.5" />
                        </g>
                        <defs>
                            <clipPath id="clip0_68_9780">
                                <rect width="26" height="26" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    Choose your cameras
                </h1>

                <button
                    type='button'
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className='flex items-center gap-2 rounded-md px-1 py-0.5 text-sm text-[#484848]
            transition-colors hover:bg-black/5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C4EF7]'
                >
                    <span>Select</span>
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                        aria-hidden='true'
                    >
                        <path
                            d='M5.59318 2.56961C5.79259 2.29044 6.2075 2.29044 6.40691 2.56962L10.4353 8.20938C10.6717 8.54032 10.4351 9 10.0284 9H1.9716C1.56491 9 1.32835 8.54031 1.56473 8.20938L5.59318 2.56961Z'
                            fill='#4E2FD2'
                        />
                    </svg>
                </button>
            </div>

            {/*
        Smooth expand/collapse using the `grid-template-rows: 0fr -> 1fr`
        technique. Animating `height: auto` directly isn't possible in
        CSS, and `max-height` hacks either jank or clip content — this
        approach animates cleanly to the panel's real height with no JS
        measuring and no ResizeObserver.

        `background-color` transitions on the same node, in the same
        duration, so the panel fades to white as it opens and fades
        back to the card's original blue as it closes — driven purely
        by `isOpen`, no extra state.
      */}
            <div
                id={panelId}
                className={`grid rounded-b-xl transition-[grid-template-rows,background-color] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] ' : 'grid-rows-[0fr] '
                    }`}
            >
                <div className='overflow-hidden'>
                    {/* Auto-centers a trailing odd item so the grid works for any
             product count, not just 5 — no layout is hardcoded per index. */}
                    <div className='grid grid-cols-1 gap-4 px-4 pb-4 sm:grid-cols-2'>
                        {products.map((product, index) => {
                            const isTrailingOdd =
                                products.length % 2 === 1 && index === products.length - 1

                            const card = (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    selectedColorId={selection[product.id]?.colorId ?? null}
                                    quantity={selection[product.id]?.quantity ?? 0}
                                    onSelectColor={selectColor}
                                    onIncrement={increment}
                                    onDecrement={decrement}
                                />
                            )

                            if (!isTrailingOdd) return card

                            return (
                                <div key={product.id} className='sm:col-span-2 sm:flex sm:justify-center'>
                                    <div className='w-full sm:w-1/2 sm:pr-2'>{card}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseYourCameras