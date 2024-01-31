'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation';
import TextField from "./textfield";
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { useDropzone } from 'react-dropzone'
import { getSignature } from '@/_actions';
import Image from 'next/image'
import classes from './editPostForm.module.css';

export default  function EditPost({id, title, address, phoneNumber, content, image}) {
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [newAddress, setNewAddress] = useState(address);
    const [files, setFiles] = useState([])

    const router = useRouter();
    const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(`/signin?callbackUrl=/editPost`)
    }
    });
  
  //setFiles(image);
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
         ...previousFiles, 
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
  

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop
  });
   useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files]);

  const handlePostUpdate = async (e) => {
    e.preventDefault();
      const file = files[0];
    // if (!file) return;

        // get a signature using server action
    const { timestamp, signature } = await getSignature();

        // upload to cloudinary using the signature
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
            method: 'PUT',
            body: formData
        }).then(res => res.json())
        console.log(postData.secure_url);
    }

    let img = postData?.public_id;
   let cloudinary_id = postData?.secure_url;


    const confirmed = confirm("Ready to update?")
        try{
           if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/post/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({newTitle, newContent,newPhoneNumber, newAddress, img, cloudinary_id})
            });
             if (res.ok) {
               console.log({ res });
             }
                if (!res.ok) {
                throw new Error( res.message || "Failure to update post item!")
            };  
            }     
            router.refresh();
            router.push("/");
        }catch (error) {
            console.log("err:: ",error);
        }
    }

    return (
        <div className="container mx-auto px-4">
            <div className="mt-20">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit Post Details</h2>
            </div>
            <div className="border-gray-900/10 pt-12 pb-8">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Item Title</h2>
            </div>
            <form onSubmit={handlePostUpdate}>
                <TextField type="text" value={newTitle} onChange={(n) => setNewTitle(n.target.value)} />
                  <div className="border-gray-900/10 pt-12 pb-8">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Item Content</h2>
                </div>
                <div className="mt-2">
                     <textarea id="content" name="content" rows="3" value={newContent} onChange={(n) => setNewContent(n.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{ content}</textarea>
                </div>
                <div className="pt-8">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Item Phone Number and Address</h2>
                </div>
                <div className="flex gap-x-8 gap-y-16 border-gray-900/10 pt-12 pb-8">
                {/* </div> */}
                {/* <div className="mt-2"> */}
                    <label htmlFor="phoneNumber" className="sr-only text-gray-900">Enter New Phone Number</label>
                     <textarea id="phoneNumber" name="phoneNumber" rows="1" placeholder='Enter New Phone' value={newPhoneNumber} onChange={(n) => setNewPhoneNumber(n.target.value)} className="block  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{ phoneNumber}</textarea>
                     <label htmlFor="address" className="sr-only">Enter New Address</label>
                     <textarea id="address" name="address" rows="3" placeholder='Enter New Adddress' value={newAddress} onChange={(n) => setNewAddress(n.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">{ address}</textarea>
                </div>
                <div className="col-span-full">
                {/* <div className="mt-5 flex items-center gap-x-3">
                    <button type="submit" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                </div> */}
              
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
          New Image File
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file?.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-contain'
              />
              <p className='mt-2 text-[12px] font-medium text-stone-500'>
                {file.name}
              </p>
            </li>
          ))}
         
        </ul>
        </div>
              <button type="submit" className="inline-flex mt-10 items-center px-5 py-1.5 text-sm font-medium text-center text-white bg-emerald-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-emerald-800">
                  Update post
              </button>
        </form> 
            <div className="border-gray-900/10 pt-12 pb-8">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Current Image</h2>
            </div>
          <div className="mx-auto max-w-2xl lg:mx-0">
                <Image
                src={image}
                alt={title}
                width="0"
                height="0"
                sizes="180vw , 180vh"
                className={classes.image}
                // style={{ width: 'auto', height: 'auto' }}
                priority
                // className='h-full w-full rounded-md object-contain'
              />
            </div>
        </div>
    )
}