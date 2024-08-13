import mongoose from "mongoose";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDB";
import Post from "@/app/models/PostSchema";
import User from "@/app/models/userSchema";
import Place from "@/app/models/placeSchema";
import { number } from "prop-types";

export const dynamic = "force-dynamic";

async function init() {
  try {
    await connectDB();
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
  const id = postId;
  let post;
  try {
    post = await Post.findById(id).populate("creator");
  } catch (err) {
    console.log("post:", err);
     return NextResponse.json({ msg: ["Unable to find post by id."] });
  }

  //check if post exists
  if (!post) {
     return NextResponse.json({ error: "Post not found", msg: ["Unable to find post."], status: 401 });
  }
   if (!post.creator) {
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
     return NextResponse.json({error:"Could not delete post right now. Try again later." , msg: ["Unable to delete post."], status: 500 });
  }
};

export const getAllPosts = async ({ page, limit, query }) => {
  let posts;
  console.log({ page, query });
  try {
    const skip = (page - 1) * limit;
    if (query) {
      posts = await Post.aggregate([
        {
          $search: {
            index: "autocomplete",
            text: {
              query: query,
              fuzzy: {
                maxEdits: 1,
                prefixLength: 3,
                maxExpansions: 50,
              },
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
    } else {
      posts = await Post.find();
    }
    if (!posts) {
      return NextResponse.json
        ({ status: 500 },
        { msg: ["Unable to find posts."] },
      );
    
    }
     return NextResponse.json(posts, { status: 200 });

  } catch (error) {
    return NextResponse.json({ msg: ["Unable to find posts."] }, { status: 500 });
  }
//  return NextResponse.json(posts ,agg,{status: 200});
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
  return posts;
};

export const getItemById = async (id) => {
  let item;
  try {
    item = await Post.findById({ _id: id });
    if (!item) {
      const error = new Error("Item not found", {});
      return next(error);
    }
  } catch (err) {
    const error = new Error("Could not find post");
    return error;
  }
  return item;
};

export const createNewPlace = async ({
  placeName,
  placeAddress,
  category,
  addressLink,
  creator,
  imageURL,
}) => {
  let email = creator.email;
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: ["Unable to create post."] });
  }
  const createNewPlace = await Place.create({
    placeName,
    placeAddress,
    category,
    addressLink,
    creator: user._id,
    imageURL,
  });
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createNewPlace.save({ session: sess });
    user.places.push(createNewPlace);
    await user.save({ session: sess });
    sess.commitTransaction();
  } catch (err) {
    const error = new Error("Unable to post");
    console.log("error:: ", error.message, err);
    return NextResponse.json({ msg: ["Unable to create post."] });
  }
};

export const getAllPlaces = async () => {
  let places;
  try {
      places = await Place.find();
    if (!places) {
      return NextResponse.json(
        { status: 500 },
        { msg: ["Unable to find posts."] }
      );
    }
    return NextResponse.json(places, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: ["Unable to find featured places."] },
      { status: 500 }
    );
  }
  //  return NextResponse.json(posts ,agg,{status: 200});
};

export const deletePlaceById = async (placeId) => {
  const id = placeId;
  let place;
  try {
    place = await Place.findById(id).populate("creator");
  } catch (err) {
    console.log("place:", err);
    return NextResponse.json({ msg: ["Unable to find place by id."] });
  }

  //check if place exists
  if (!place) {
    return NextResponse.json({
      error: "Post not found",
      msg: ["Unable to find post."],
      status: 401,
    });
  }
  if (!place.creator) {
    return NextResponse.json({
      error: "Author not found.",
      msg: ["Unable to find author."],
      status: 400,
    });
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
    return NextResponse.json({ message: "Success:: ", status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: "Could not delete place right now. Try again later.",
      msg: ["Unable to delete place."],
      status: 500,
    });
  }
};





