import React from 'react'
import productData from './../../data/product.json'
import type { ProductsData } from '../../types/product.types'
import { useProductSelection } from '../../hooks/useProductSelection'
import ProductCard from './ProductCard'

const { products } = productData as ProductsData

const ChooseYourCameras: React.FC = () => {
    const { selection, selectColor, increment, decrement } =
        useProductSelection(products)

    return (
        <div className='w-full rounded-xl bg-[#EDF4FF]'>
            <h1 className='border-b border-gray-400 p-2 text-md font-semibold text-[#484848]'>
                Step 1 of 4
            </h1>

            <div className='flex flex-col items-center justify-center gap-4 p-4 flex-wrap sm:flex-row sm:justify-between sm:items-center'>
                <h1 className='text-2xl font-semibold text-[#484848]'>
                    Choose your cameras
                </h1>
                <div className='flex items-center gap-2 text-sm text-[#484848]'>
                    <p className='text-sm text-[#484848]'>
                        Select
                    </p>
                    <p>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.59318 2.56961C5.79259 2.29044 6.2075 2.29044 6.40691 2.56962L10.4353 8.20938C10.6717 8.54032 10.4351 9 10.0284 9H1.9716C1.56491 9 1.32835 8.54031 1.56473 8.20938L5.59318 2.56961Z" fill="#4E2FD2" />
                        </svg>

                    </p>
                </div>
            </div>

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
    )
}

export default ChooseYourCameras
