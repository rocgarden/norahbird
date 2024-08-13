'use client' 
import { useSession } from "next-auth/react";
import { deletePlace } from "@/_actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RemovePost from "@/RemovePost";

export default  function Featured(props) {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  function handleOpenModal(id) {
    setModalOpen(true);
  };
   function handleCloseModal() {
     setModalOpen(false);
  }; 
  const handleDelete = async () => {
     console.log("id:: ", props.id)
      await deletePlace(props.id);

    //  if (data?.data.msg) {
    //    setErrorMessage(data?.data.msg);
    //    confirmed = confirm(data?.data.msg);
    //  }
    //  if (!data.data.error) {
    //    toast.success("Deleted");
    //  }
     handleCloseModal();
    router.push("/");
   };


    const places = [
        {
        id: 1,
        img_url: "https://a.mktgcdn.com/p/udzwzhmgwMF3oMoBSbz81Twhc5JGqRK7upEYsqNNT6U/1024x550.jpg",
        card_title: "Buca di Beppo Universal Citywalk",
        card_content: "1000 Universal Studios Blvd, Universal City, CA, 91608.",
        directions: "https://maps.app.goo.gl/CPj2VVMt4Y98H5QK7"
        },
        {
        id: 2,
        img_url: "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/universal-studio-tour-explosion-802x535.jpg?imwidth=738",
        card_title: "Universal Studios Hollywood",
        card_content: "1000 Universal Studios Blvd, Universal City, CA, 91608.",
        directions: "https://maps.app.goo.gl/CPj2VVMt4Y98H5QK7"
        },
        {
        id: 1,
        img_url: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/1300/544/75/vision-dam/digital/parks-platform/parks-global-assets/disneyland/experience/homepage/Halloween-Pumpkin-2x1.jpg?2024-06-26T18:22:01+00:00",
        card_title: "Disneyland Resort",
        card_content: "1313 Disneyland Dr Anaheim, CA 92802.",
        directions: "https://maps.app.goo.gl/uw1vMMRFmrCRMyVB7"
        },
    ]
return (
  // <div className="container mx-auto my-5 transition ease-in-out delay-150 lg:bg-white ">
  //   <div>
  //     <div className=" items-center justify-center">
  //       <div className="lg:flex items-center container mx-auto my-auto">
  <div className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 hover:-translate-y-1 hover:scale-110 hover:opacity-100 duration-300 ...">
    <img
      src={props.imageURL}
      alt={props.placeName}
      className="h-80 w-full object-cover object-center "
    />
    <div className="p-4">
      <h3 className="font-medium text-gray-800 text-lg my-2 uppercase">
        {props.placeName}
      </h3>
      <p className="text-justify text-gray-600">{props.placeAddress}</p>
      <div className="mt-5">
        <a
          href={props.addressLink}
          className="text-gray-800 hover:bg-gray-700 hover:text-white rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600"
        >
          Google Maps
        </a>
      </div>
    </div>
    {session ? (
      <div className="flex items-center gap-x-4 text-xs mb-3 ml-3">
        <div className="flex-1 mt-8 sm:py-1 py-3  overflow-hidden text-balance">
          <p className="p-2 bg-red-700 inline text-2xl text-slate-100">
            Option to delete only when authenticated! No editing!
          </p>
        </div>
        <button
          type="submit"
          className="text-gray-800 hover:bg-red-700 hover:text-white rounded-md border border-stone-300 px-3 py-1 text-sm dark:border-stone-600"
          onClick={handleOpenModal}
        >
          Delete Place
        </button>
        {modalOpen ? (
          <RemovePost
            postId={props.id}
            handleDelete={handleDelete}
            handleCloseModal={handleCloseModal}
            handleOpen={handleOpenModal}
          />
        ) : null}
      </div>
    ) : null}
  </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
);
}