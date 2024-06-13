"use server"
import { v2 as cloudinary } from "cloudinary";

import { createNewPost } from "./app/lib/createNewPosts"
import { getAllPosts } from "./app/lib/createNewPosts";
import { getPostsById } from "./app/lib/createNewPosts";
import { deletePostById } from "./app/lib/createNewPosts";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function savePostToDB({ title, content,category, phoneNumber, address, addressLink, image, creator, cloudinary_id }) {
  await createNewPost({
    title,
    content,
    address,
    addressLink,
    phoneNumber,
    creator,
    category,
    image,
    cloudinary_id,
  });
}

  
export async function addEntry(
  data,
  category,
  creator,
  { public_id, version, signature, secure_url }
) {
  const { title, content, address, addressLink, phoneNumber } =
    Object.fromEntries(data);
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret
  );
  try {
    if (expectedSignature === signature) {
      await savePostToDB({
        title,
        content,
        phoneNumber,
        address,
        addressLink,
        creator,
        category,
        image: public_id,
        cloudinary_id: secure_url,
      });
    } else {
      await savePostToDB({
        title,
        content,
        creator,
        category,
        phoneNumber,
        address,
        addressLink,
      });
    }
  } catch (error) {
    return NextResponse.json({message: "Unable to create new post." }, { status: 400 }, {error: error});
  }
  redirect(`/`);
}
   
// export async function getPosts(){
//     const posts = await getAllPosts();
//     // console.log("action posts:: ", posts);
   
//     return posts.json();   
// };

//sort posts by date
export async function getPosts() {
  try {
  const posts = await getAllPosts();
  const allPosts =await posts.json();
  const sortPostItems = allPosts.slice().sort((postA, postB) =>
    postA._id > postB._id ? -1 : 1
  );
  
  return sortPostItems;
  } catch (error) {
    //return error;
    return NextResponse.json({message: "No items found", error: error.message})
  }

}

export async function deleteById(postId) {
  try {
    const res = await deletePostById(postId);
    const data = await res.json();
    if (data.status != 200) {
      console.log("data:: ", data.status);
      //revalidateTag("posts"); // Update cached posts
      return { data };
    }
    revalidateTag("posts"); // Update cached posts
    return { data };
  } catch (error) {
    return error;
  }
}

export async function getByUserId(creator){
 await getPostsById({creator});
}

export async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "next" },
    cloudinaryConfig.api_secret
  );

  return { timestamp, signature };
}

