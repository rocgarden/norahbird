"use client";

import { useRouter } from "next/navigation";
import { deleteById } from "./_actions";
import { useState } from "react";
import Modal from "./app/components/modal";
// import Button from "./app/components/button";

export default  function RemovePost(props, { postId, handleCancel, handleOpen }) {
 // const deletePostItem = deleteById.bind(null, postId);
 // console.log("delete:: ",deletePostItem);
 
  const handleDelete = () => {
   props.handleDelete(postId)
 }
 
 // const router = useRouter();
  // const deletePost = async () => {
  //   const confirmed = confirm("Are you sure?");

  //   if (confirmed) {
  //     const res = await fetch(`http://localhost:3000/api/post?id=${postId}`, {
  //       method: "DELETE",
  //     });
  //     if (res.ok) {
  //       router.refresh();
  //     }
  //     console.log("res:: ",res)
  //   }
  // };

  return (
    <>
      {/* -----
       <button
        type="submit"
        onClick={deletePost}
        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Delete Post
      </button> 
      -----------
      */}

      {/*
      ------------ 
      <form action={deletePostItem}>
        <button
          type="submit"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Delete Post
        </button>
      </form> 
      ---------------
      */}
      <Modal
        handleDelete={props.handleDelete}
        handleCloseModal={props.handleCloseModal}
        handleOpen={props.handleOpen}
      >
        <button
          type="submit"
          onClick={props.handleDelete}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Delete Post
        </button>
      </Modal>
    </>
  );
}
