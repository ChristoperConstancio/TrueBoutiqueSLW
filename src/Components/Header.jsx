import { Link } from "react-router-dom";


export default function Header() {

  return (
  
      <header className='bg-black w-full h-max '>
        <nav className=' pt-7 mx-20 flex  justify-center'>
          
          <div className='justify-center flex gap-x-8'>
            <a href="https://www.tiktok.com/@trueboutiqueslw?_t=8gOofkNt674&_r=1">
              <span class="sm:text-4xl text-3xl material-symbols-outlined sm:hover:text-amber-500 text-white hover:text-white">
                media_link
              </span>
            </a>
            <Link to="/">
              <span className="sm:text-4xl text-3xl material-symbols-outlined sm:hover:text-amber-500 text-white hover:text-white">
                home
              </span>
            </Link>
            <Link to="/login" >
              <span className="sm:text-4xl text-3xl material-symbols-outlined sm:hover:text-amber-500 text-white hover:text-white">
                laundry <p id="txtLaundry"></p>
              </span>
            </Link>
          </div>
        </nav>
        <div className='mx-4 h-80 flex justify-center pt-20 '>
          {/* <h1 className="absolute font-bold text-gray-700 text-8xl opacity-80 font-Kaushan mb-2">TB</h1> */}
          <h1 className="absolute font-Raleway pr-32 text-xl  text-gray-300 font-bold sm:text-lg"> True</h1>
          <h1 className=' pl-7 font-Kaushan  text-4xl text-amber-500 sm:text-4xl '>Boutique </h1>
        </div>
      </header>
  )
}
