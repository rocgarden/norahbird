import EditPost from "@/app/components/editPostForm";

export default async function EditPostItem({ params }) {
  const { id } = params;
  //const { post } = await getPostById(id);
 try {
    const res = await fetch(`/app/api/post/${id}`, {
      cache: "no-store",
    });
    console.log("res:: ",res.json())
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    const postItem = await res.json();
    const { title, content, phoneNumber, address, cloudinary_id } = postItem;

  return <EditPost id={id} title={title} phoneNumber={phoneNumber} address={address} content={content} image={cloudinary_id} />;

//return postItem;
  } catch (error) {
    console.log(error);
  }
}
