'use client'
import Link from "next/link";
import Image from "next/image";
import classes from './postcard.module.css';
import { useState } from "react";
const PlaceItem = ({title, category,phoneNumber, image, addressLink,address,content}) => {
  const { formatPhone, setFormatPhone } = useState();
  const phoneFormat = (input) => {
  if (!input || isNaN(input) || input === 'undefined') return null;
  // if(!input || isNaN(input)) return `input must be a number was sent ${input}`
  if(typeof(input) !== 'string') input = input.toString()
  if(input.length === 10){
    return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if(input.length < 10) {
    return 'was not supplied enough numbers please pass a 10 digit number'
  } else if(input.length > 10) {
    return 'was supplied too many numbers please pass a 10 digit number'
  }else{
    return 'something went wrong'
  }
  }
  const phNumber = phoneFormat(phoneNumber);

    return ( 
    <section className="grid my-10 mx-10 place-items-center">
      <div className="container grid grid-cols-1 my-10">
         <div className="relative flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none grid item sm:grid-cols-2">
            <div className="relative bg-clip-border rounded-md overflow-hidden bg-white text-gray-700 shadow-lg m-0">
              {
                image ? (
               <img src={image} alt={title} className="object-cover w-full h-full" />
            ):
        <Image 
        src="/imgHolder.jpg"
        alt={title} 
        width="0"
        height="0"
        sizes="30vw , 100vh"
        className={classes.image}
        priority
      
          />  
              }
         </div>
    <div className="p-8 px-2 sm:pr-6 sm:pl-4">
      <h5 className={ classes.category}>{ category }</h5>
      <h5 className=" mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">{ title }</h5>
    <div className="grid">
    {phoneNumber ? 
    <a href={ "tel:" + 1+phoneFormat(phoneNumber)}   rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline">
    <span className="pr-2">
     <svg className="w-4 h-4 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="text-gray-200" viewBox="0 0 18 18">
          <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
     </svg>
    </span>
    <p className="mb-3 font-normal text-gray-500 dark:text-gray-900">{ phoneNumber }</p>
    </a> : null}
    { addressLink ? 
    (<a href={addressLink}  target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline">
    <span className="pr-3">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
      </svg>
      </span>
     {address}
    </a>) : 
     <p className="mb-3 font-normal text-gray-500 dark:text-gray-900">{ address }</p> 
    }
    </div>
    <p className={classes.contentHeading}>What's Best: </p>
    <p className="mb-3 font-normal text-gray-500 dark:text-slate-900">{ content }</p>
    </div> 
    </div>
 </div> 
</section>
  )
}

export default PlaceItem;
