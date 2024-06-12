"use client"; 

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
      <div className=" grid justify-items-center  content-center mx-auto my-10   border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:flex lg:justify-center lg:gap-3  text-gray-900">
      <div className="errorMessage">
        <h2>Something went wrong while retrieving posts. Try again later.</h2>
      </div>
      {/* <button onClick={() => reset()}>
        <div className="errorMessage">Try again </div>
      </button> */}
    </div>
  );
}
