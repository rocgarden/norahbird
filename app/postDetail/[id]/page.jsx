import PlaceItem from "@/app/components/placeItem";
import { getItemById } from "@/app/lib/createNewPosts";

const getPlaceById = async (id) => {
    try {
      const data = await getItemById(id);
        if (!data) {
            return error;
      }
    return { data };
    } catch (error) {
        console.log(error);
        return error;
    } 
}

export async function generateMetadata({params}) {
  const { id } = params;
  const  placeItem  = await getPlaceById(id);
  if (!placeItem) {
    return;
  }  
  return (
    {
      title: placeItem.data.title,
      description: placeItem.data.content,
      openGraph: {
      title: placeItem.title,
      description: placeItem.content,
      type: "website",
      locale: "en_US",
      url: `https://norahbird.com/postDetail/${id}`,
      siteName: "Norah Bird"
      },
      alternates: {
        canonical:`/postDetail`
      }
    }  
  )
}

export default async function PostDetail({ params }) {
 const { id } = params;
 const { data } = await getPlaceById(id);
 const { title, category,phoneNumber, cloudinary_id, addressLink,address,content, updatedAt } = data
  return(
    <div>
     <PlaceItem params={params} title={title} category={category} phoneNumber={phoneNumber} image={cloudinary_id} addressLink={addressLink} address={address} content={content} updatedAt={updatedAt} />
    </div>
  );

}
