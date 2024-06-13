import connectDB from "@/app/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Post from "@/app/models/PostSchema";

export const dynamic = "force-dynamic";

export async function POST(req) {
    const { title, content, creator } = await req.json();
 
    try {
    await connectDB();
 
  await Post.create({ title, content, creator });

  return NextResponse.json({
    msg: ["Post  created"],
    success: true,
  });
} catch (error) {
  if (error instanceof mongoose.Error.ValidationError) {
    let errorList = [];
    for (let e in error.errors) {
      errorList.push(error.errors[e].message);
    }
    return NextResponse.json({ msg: errorList });
  } else {
    return NextResponse.json({ msg: ["Unable to create user."] });
  }
}

}

export async function GET() {
  await connectDB();
  const posts = await Post.find();
  console.log("Posts connnected: ");
  if (!posts || posts.length === 0) {
    const error = new Error("Posts not found");
    return NextResponse.json({ error, msg: ["Unable to find posts."] });
  }
  return NextResponse.json( posts)

}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  //   post = await Post.findByIdAndDelete(id);
  let post;
  try {
    post = await Post.findById(id).populate("creator");
  } catch (err) {
    return NextResponse.json({ msg: ["Unable to find post by id."], error:err });
  }
  //check if post exists
  if (!post) {
    const error = new Error("Post not found");
    return NextResponse.json({ error, msg: ["Unable to find post."] });
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.deleteOne({ session: sess });
    post.creator.posts.pull(post);
    await post.creator.save({ session: sess });
    await sess.commitTransaction();
    return NextResponse.json({ message: "Post deleted!", success: true})
  } catch (err) {
    return NextResponse.json({ msg: ["Unable to delete post."] });
  }
};

 