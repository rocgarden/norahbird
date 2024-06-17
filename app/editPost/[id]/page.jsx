import EditPost from "@/app/components/editPostForm";

const getPostById = async(id) => {
   try {
    const res = await fetch(`/api/post/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
   return res.json();
   
  } catch (error) {
    console.log(error);
 }
}

export default async function EditPostItem({ params }) {
  const { id } = params;
  const { post } = await getPostById(id);
  console.log(post)
  const {title, phoneNumber, address, content, cloudinary_id} = post
  return(
    <div>
     <EditPost id={id} title={title} phoneNumber={phoneNumber} address={address} content={content} image={cloudinary_id} />
    </div>
  );

}
