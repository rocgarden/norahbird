"use client";
import React from "react";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { addNewPlace } from "@/_actions";

function newPlace() {
  const formRef = useRef(null);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackUrl=/protected");
    },
  });
  async function action(data) {
    const creator = session.user.email;
    //upload post item to db
    const result = await addNewPlace(data, creator);
    if (result?.error) {
      setErrorStatus(result.error);
      throw new Error();
    } else {
      formRef.current.reset();
    }
  }
  return (
    <div className="flex mt-10  justify-center">
      <form ref={formRef} action={action}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center space-x-1 sm:pr-4"></div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <textarea
              name="imageURL"
              type="text"
              rows="1"
              className="block w-full px-8 mb-5 text-lg text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Image URL..."
              required
            ></textarea>
            <textarea
              name="placeName"
              type="text"
              rows="1"
              className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Name of Place"
              required
            ></textarea>
            <textarea
              name="placeAddress"
              type="address"
              rows="4"
              className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Address..."
              required
            ></textarea>
            <textarea
              name="addressLink"
              type="address"
              rows="1"
              className="block w-full px-8 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Address HyperLink..."
              required
            ></textarea>
            <label htmlFor="content" className="sr-only">
              Publish New place
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600"
        >
          Publish Place
        </button>
      </form>
    </div>
  );
}

export default newPlace;
