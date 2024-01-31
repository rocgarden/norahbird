'use client';
import RemovePost from "@/RemovePost";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import { useState } from "react";
import { deleteById } from "@/_actions";
import { toast } from "react-toastify";
import { dancing_script } from "@/styles/fonts";
import classes from './postcard.module.css';

const postCard = ({ title, content, phoneNumber, address, addressLink, postId, image, category }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  let confirmed;
  
  const handleDelete = async () => {
    const data = await deleteById(postId);

    if (data?.data.msg) {
      setErrorMessage(data?.data.msg);
      confirmed = confirm(data?.data.msg);
    }
    if (!data.data.error) {
      toast.success("Deleted");
    }
    handleCloseModal();
    router.push("/");
  }
  
  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleOpenModal(id){
      setModalOpen(true)
  }
  
  
 const { data: session } = useSession();
    return ( 
  <div className="flex mt-3">
     {
      confirmed ? 
            <div><h2>{errorMessage}</h2></div>
            : null
    }
   
{/* <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}
     <article className="flex max-w-xl flex-col items-start justify-between">
 
    <div> 
    {/* <div>
    <svg className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
       <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"/>
    </svg>
    </div> */}
    </div>
     <div>
      <h5 className={ classes.category}>{ category }</h5>
    </div>
    <a href="#">
     <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">{ title }</h5>
    </a>
   {phoneNumber ? <a href={ "tel:" + 1+phoneNumber}   rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline">
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-900">{ phoneNumber }</p>
     <svg className="w-3 h-4 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="text-gray-500" viewBox="0 0 18 18">
          <path  strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
        </svg>
    </a> : null}
  { addressLink ? 
    (<a href={addressLink}  target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:underline">
     {address}
     <svg className="w-3 h-3 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
      </svg>
    </a>) : 
     <p className="mb-3 font-normal text-gray-500 dark:text-gray-900">{ address }</p> 
    }
    <p className={classes.contentHeading}>What's Best: </p>
    <p className="mb-3 font-normal text-gray-500 dark:text-slate-900">{ content }</p>
    {/* <a href="#" className="inline-flex items-center text-blue-600 hover:underline">
        See our guideline
        <svg className="w-3 h-3 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
        </svg>
    </a> */}
 
    {
    session ? (
        <div className="flex items-center gap-x-4 text-xs">
           <Link href={`/editPost/${postId}`}>
                 <div className=" flex items-center gap-x-3">
                    <button type="submit" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Edit</button>
                </div>  
           </Link>
          <button
          type="submit"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
           onClick={handleOpenModal}
           >
          Delete Post
        </button>
        {
          modalOpen ?  
          <RemovePost postId={postId} handleDelete={handleDelete} handleCloseModal={handleCloseModal} handleOpen={handleOpenModal}/>
          :null
        }
       </div>
    ): null
}
</article>
   <div className="relative ml-8 items-center hidden md:block">
    {
        image ? ( 
        <Image src={image} 
        alt={title} 
        width="0"
        height="0"
        sizes="100vw"
        className={classes.imageImport}
        // style={{ width: '40%', height: 'auto' }}
        priority
        //sizes='width=140, heigth=140'
        // width={140} height={140}
          />   
        ) : 
      <Image 
        src="/imgHolder.jpg"
        alt={title} 
        width="0"
        height="0"
        sizes="30vw , 100vh"
        className={classes.image}
        // style={{ width: 'auto', height: 'auto' }}
        priority
        //sizes='width=140, heigth=140'
        // width={140} height={140}
          />   
    }
  
    </div>
 </div>

      
  //  </div>
  )
}

export default postCard;
