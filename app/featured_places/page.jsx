import React from "react";
import { getPlaces } from "@/_actions";
import Featured from "../components/featured";

async function FeaturedPlaces() {
  const allPlaces = await getPlaces();
  if (!allPlaces || allPlaces.length === 0) {
    throw new Error("Places not found");
  }
  return (
    <div className="container mx-auto my-5 transition ease-in-out delay-150 bg-gradient-to-r from-blue-800 to-blue-300">
      <div className="text-center pt-12">
        <p className="text-[40px] text-wrap">
          Local Hotspots
        </p>
        <div className="flex items-center justify-center w-full">
          <div className="mt-8 sm:py-1 mb-8 border-t-2  w-1/2"></div>
        </div>
        <div className="w-full mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <p className="text-center max-w-xs">There's lots to do on a weekend trip. You can explore through the hills on a beautfiful hike, catch a game courtside, or test your thinking skills on a frantic escape room.</p>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-center max-w-xs">Check out events all around town happening even on slow week days. You can visit museums or shop at exclusive boutiques.</p>
        </div>
      </div>
        </div>
      </div>
        <div className=" items-center justify-center">
          <div className="lg:flex items-center container mx-auto my-auto">
            {allPlaces?.map((place) => {
              return (
                <Featured
                  key={place._id}
                  id={place._id}
                  imageURL={place.imageURL}
                  placeName={place.placeName}
                  placeAddress={place.placeAddress}
                  addressLink={place.addressLink}
                />
              );
            })}
          </div>
        </div>
    </div>
  );
}

export default FeaturedPlaces;
