import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDB";
import Post from "@/app/models/PostSchema";
import User from "@/app/models/userSchema";
async function init() {
  try {
    await connectDB();
    console.log("db hit")
  } catch (error) {
    throw new Error("failed to connect DB");
  }
}
(async () => {
  await init();
})();

export const createNewPost = async ({
  title,
  content,
  category,
  address,
  addressLink,
  phoneNumber,
  creator,
  image,
  cloudinary_id,
}) => {
  let email = creator.email;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: ["Unable to create post."] });
  }
  // console.log("user data :: ", user);
  const createNewPost = await Post.create({
    title,
    content,
    category,
    phoneNumber,
    address,
    addressLink,
    creator: user._id,
    image,
    cloudinary_id,
  });
  console.log("category::: ",category)
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createNewPost.save({ session: sess });
    user.posts.push(createNewPost);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new Error("Unable to post");
    console.log("error:: ",err);
    return NextResponse.json({ msg: ["Unable to create post."] });
  }
};

export const deletePostById = async (postId) => {
  //  const id = request.nextUrl.searchParams.get("id");
  const id = postId;
  let post;
  try {
    post = await Post.findById(id).populate("creator");
    console.log("post:: ", post)
  } catch (err) {
    console.log("post:", err);
     return NextResponse.json({ msg: ["Unable to find post by id."] });
  }
  //  console.log("postId:: ", post);

  //check if post exists
  if (!post) {
    //const error = new Error("Post not found");
     return NextResponse.json({ error: "Post not found", msg: ["Unable to find post."], status: 401 });
  }
   if (!post.creator) {
     //const error = new Error("Author not found");
     return NextResponse.json({ error: "Author not found.", msg: ["Unable to find author."], status: 400 });
   }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.deleteOne({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
    return NextResponse.json({message:"Success:: ", status:200});

  } catch (err) {
   // const error = new Error("Could not delete right now.");
     return NextResponse.json({error:"Could not delete post right now. Try again later." , msg: ["Unable to delete post."], status: 500 });
  }
};

export const getAllPosts = async () => {
   const posts = await Post.find();
  //  console.log("All Posts connnected: ", posts);
   return NextResponse.json(posts);
};

export const getPostsById = async ({ creator }) => {
  let email = creator.email;
  let userId;
  let user;
  let posts;
  try {
    user = await User.findOne({ email });
  } catch (err) {
   return NextResponse.json({ msg: ["Unable to find user."] });
  }
  userId = user._id;
  try {
    posts = await Post.findById(userId);
  } catch (err) {
    return NextResponse.json({ msg: ["Unable to find user id."] });
  }
  if (!posts) {
    return NextResponse.json({ msg: ["Unable to find posts."] });
  }
  //console.log("all posts:: ", posts);
  return posts;

}


