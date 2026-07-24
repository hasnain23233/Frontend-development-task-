import React from 'react'
import ChooseYourCameras from './ChooseYourCameras/ChooseYourCameras.tsx'
import ReviewPanel from './review/ReviewPanel'

const MainLayout = () => {
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-4 w-full h-screen'>
                <h1 className='text-3xl sm:hidden block text-red-500'>Let’s get started!</h1>
                <div className='flex md:flex-row flex-row w-11/12 border-2 border-gray-200 rounded-xl gap-4 m-auto justify-between items-center gap-4'>
                    <div className='flex flex-col justify-center items-center  w-8/12'>
                        <ChooseYourCameras />
                    </div>
                    <div>
                        <ReviewPanel />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout
