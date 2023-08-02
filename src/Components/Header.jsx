

export default function Header() {

  return (
  
      <header className='bg-gray-400 sm:bg-gray-800 w-full h-54 sm:h-24'>
        <nav className=' pt-7 mx-20 flex sm:justify-between justify-center'>
          <div className='mx-4 sm:flex justify-left  hidden '>
            <h1 className="font-Raleway  text-xl text-black sm:text-white sm:text-4xl"> True</h1>
            <h1 className='font-Kaushan   text-xl text-black sm:text-amber-500 sm:text-4xl'>Boutique </h1>

          </div>
          <div className='justify-center flex gap-x-8'>
            <a href="Invetory.jsx">
              <span class="sm:text-4xl text-3xl material-symbols-outlined sm:hover:text-amber-500 sm:text-white hover:text-white">
                media_link
              </span>
            </a>
            <a>
              <span className="sm:text-4xl text-3xl material-symbols-outlined sm:hover:text-amber-500 sm:text-white hover:text-white">
                home
              </span>
            </a>
            <a >
              <span className="sm:text-4xl text-3xl material-symbols-outlined sm:hover:text-amber-500 sm:text-white hover:text-white">
                laundry <p id="txtLaundry"></p>
              </span>
            </a>
          </div>
        </nav>
        <div className='mx-4 h-80 flex justify-center pt-20 sm:hidden'>
          <h1 className="font-Raleway  text-2xl text-black sm:text-white sm:text-4xl"> True</h1>
          <h1 className='font-Kaushan   text-4xl text-black sm:text-white sm:text-4xl'>Boutique </h1>
        </div>
      </header>
  )
}
