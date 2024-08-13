import React from "react";
import { getPlaces } from "@/_actions";
import Featured from "../components/featured";

async function FeaturedPlaces() {
  const allPlaces = await getPlaces();
  if (!allPlaces || allPlaces.length === 0) {
    throw new Error("Places not found");
  }
  return (
    <div className="container mx-auto my-5 transition ease-in-out delay-150 lg:bg-white ">
      <div>
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
    </div>
  );
}

export default FeaturedPlaces;
