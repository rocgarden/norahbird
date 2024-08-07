import React from 'react'
import Link from 'next/link'
import classes from './footer.module.css';

const footer = () => {
  return (
      <div className="grid justify-items-center  content-center mx-auto  py-8 sm:mt-16 lg:mx-0 lg:max-w-none lg:flex lg:justify-center lg:gap-3  text-gray-900">
      <Link className={classes.link}  href="/">
        <h4>Norah <span className='text-blue-400'>Bird</span></h4>
      </Link>
      <div className='text-gray-500 hidden lg:flex'>|</div>
      <Link className={classes.about} href="/about">
        About
      </Link>
       <div className='text-gray-500 hidden lg:flex'>|</div>
      <Link className={classes.about} href="/contact">
        Contact
      </Link>
       <div className='text-gray-500 hidden lg:flex'>|</div>
      <Link className={classes.about} href="/privacy">
        Privacy Policy
      </Link>
      <div className='text-gray-500 hidden lg:flex'>|</div>
      <p className={classes.about}>Copyright ©{new Date().getFullYear()}</p> 
      </div>
  )
}

export default footer