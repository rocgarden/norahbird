'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import {  useRef } from 'react';
import { addEntry, getSignature } from '@/_actions';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import IconDropDown from '../components/IconDropdown';

const newItem = (props) => {
  const [selected,setSelected] = useState()
  const formRef = useRef(null);
  const { data: session } = useSession(
    {
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/protected')
    }
    }
  );
  let category;
  if (selected) {
    category = selected.name
  }

  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        // ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, []);
   
  const removeRejected = name => {
      setRejected(files => files.filter(({ file }) => file.name !== name))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files]);

  async function action(data) {
    const creator = session.user.email;

    const file = files[0];
    // if (!file) return;
        // get a signature using server action
    const { timestamp, signature } = await getSignature();

        // upload using the signature
    const formData = new FormData();
    let postData;
    if (file) {
    formData.append('file', file);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp);
    formData.append('folder', 'next');
    const endpoint = (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || '');
     postData = await fetch(endpoint, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
    }
    //upload post item to db
    const result = await addEntry(data, category,  creator,{
      version: postData?.version,
      signature: postData?.signature,
      public_id: postData?.public_id,
      secure_url: postData?.secure_url
    });
    if (result?.error) {
      setErrorStatus(result.error);
    } else {
      formRef.current.reset()
    }
  }
  
  return (
   <div>
      {
        session ? (
    <section className='container mx-auto sm:px-4 py-24'>
      <div className='container my-8'>
         <h1 className='text-gray-900 text-2xl font-bold text-center'>
          Create a New Post
        </h1>
      </div>
      <IconDropDown setSelected={setSelected} />
      {
        selected && 
        <div className='m-5' ><p className='text-gray-900'>Category Selection: {category}</p></div>
      }

      <form ref={formRef} action={action}>

        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
               <div className="flex items-center space-x-1 sm:pr-4">
                   <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                        </svg>
                       <span className="sr-only">Embed map</span>
                   </button>
                   <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                       <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/>
                        </svg>
                       <span className="sr-only">Add emoji</span>
                   </button>
               </div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
           <textarea name='title' type="text" rows="1" className="block w-full px-8 mb-5 text-lg text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Title of Post..." required></textarea>
           <textarea name='phoneNumber' type="tel" rows="1" className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Phone Number with No Spaces or dashes..." required></textarea>
           <textarea name='address' type="address"  rows="4" className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Address..." required></textarea>
           <textarea name='addressLink' type="addressLink"  rows="1" className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Address HyperLink..." ></textarea>
            <label htmlFor="content" className="sr-only">Publish New post</label>
           <textarea name='content' type="text"  rows="8" className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Article..." required></textarea>
          </div>
        </div>
        <div>
            <h2 className='text-gray-900 font-bold mt-8 font-medium'>Add an image: </h2>
           <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
   <div>
    <div
        {...getRootProps({
          className:"mt-10 border border-neutral-200 p-16"
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4 text-gray-900 '>
          <ArrowUpTrayIcon className='h-5 w-5 fill-current text-gray-900 ' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>
        <h3 className='title mt-10 border-b pb-3 text-lg font-semibold text-stone-600'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files?.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-contain'
              />
              {/* <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
              </button> */}
              <p className='mt-20 text-[12px] font-medium text-stone-500'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>
   </div>
     <button type="submit" className="inline-flex mt-10 items-center px-5 py-1.5 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-emerald-800">
       Publish post
   </button>
      </form>
   </section>
        ): 
          redirect('/signin')
      }
         {
          rejected ? 
            (
        <div className='container mx-auto px-24 py-24'>
        <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-neutral-500 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>File must be below 1mb.</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                Remove Selected File
              </button>
            </li>
          ))}
        </ul>
        </div>
        ): null
        }
   </div>
   
  )
}
export default newItem;

