import Link from "next/link";
import React from "react";
import clsx from "clsx";

function pagination({ search, page }) {
  return (
    <>
        <div>
          <Link
            href={{
              pathname: "/",
              query: {
                ...(search ? { search } : {}),
                page: page > 1 ? page - 1 : 1,
              },
            }}
            className={clsx(
              "mx-2 text-gray-800 hover:bg-gray-700 hover:text-white rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600",
              page <= 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </Link>
          <Link
            href={{
              pathname: "/",
              query: {
                ...(search ? { search } : {}),
                page: page + 1,
              },
            }}
            className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600"
          >
            Next
          </Link>
        </div>
    </>
  );
}

export default pagination;
