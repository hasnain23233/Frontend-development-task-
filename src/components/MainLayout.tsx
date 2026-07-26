import BundleConfigurator from './ChooseYourCameras/BundleConfigurator.tsx'
import ReviewPanel from './review/ReviewPanel'

const MainLayout = () => {
  return (
    <div className='text-center'>
      <h1 className='my-2 block text-2xl font-bold text-gray-900 sm:hidden sm:text-4xl'>
        Let&rsquo;s get started!
      </h1>

      <div className='m-auto flex w-10/12 my-12  flex-col items-center justify-between gap-4 rounded-xl text-start md:flex-row md:items-start'>
        <div className='flex w-full flex-col items-center justify-center md:w-7/12'>
          <BundleConfigurator />
        </div>

        <div className='w-full md:w-4/12'>
          <ReviewPanel />
        </div>
      </div>
    </div>
  )
}

export default MainLayout