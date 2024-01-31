'use client'
import Link from 'next/link'
import SignInButton from './signInButton';
import { useSession } from 'next-auth/react';
import classes from './navbar.module.css';

const navbar = () => {
    const { status, data: session } = useSession();

  return (          
<nav className=" shadow-sm border-gray-200 dark:text-slate-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
     <Link href="/" className="flex items-center md:text-5xl sm:3xl">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
      <span className={classes.navbar} >Norah <span className='text-blue-400' >Bird</span></span>

      </Link>
 
 
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
      {/* <div class="relative mt-3 md:hidden">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."/>
      </div> */}
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800  dark:border-gray-700">
        <>
        {
            status === 'authenticated' && session  ?(
            <li className='text-sm'>
            <Link href='/protected'>Protected</Link>
             </li> 
            ):(
            null
            )
        }
        </>
        <li>
          <Link href='/'>Home</Link>
          {/* <a href="/" className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-slate-900 md:p-0 md:dark:text-slate-900" aria-current="page">Home</a> */}
        </li>       
        <li>
        <SignInButton />
        </li>
      </ul>
    </div>
  </div>
  {
    session ?(
      
        <div className='pl-5 items-center justify-between bg-indigo-600'>
          <p className="flex h-10 items-center justify-center  px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
              This is a <span className='text-blue-400 text-2xl font-bold'> client-side</span>{' '}
            protected page. You are logged in as:  {' '}
            <span className='text-center dark:text-blue-400 text-2xl font-bold'>{session?.user?.name}</span>
            </p>
        {/* <h1 className='text-center dark:text-slate-900 text-2xl font-bold'>
          This is a <span className='text-blue-400'>client-side</span>{' '}
          protected page
        </h1> */}
       
      </div> 
    ): null
  }
</nav>
  )
}

export default navbar;