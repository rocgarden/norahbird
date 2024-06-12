"use client"; 

import { useEffect } from "react";
import classes from './feed.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
   
    console.error(error);
  }, [error]);

  return (
    <div className="classes.errorDiv">
    <div className="text-gray-500 m-20 lg:flex">
        <h2>Something went wrong!</h2>
      </div>
      <button onClick={() => reset()}>
        <div className="text-gray-500  lg:flex">Try again </div>
      </button>
    </div>
  );
}
