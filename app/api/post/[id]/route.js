import connectDB from "@/app/lib/mongoDB";
import { NextResponse } from "next/server";
import Post from "@/app/models/PostSchema";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
//   const id = request.nextUrl.searchParams.get("id");
  
  let { id } = params;
  
  const {
    newTitle: title,
    newContent: content,
    image: image,
    cloudinary_id: cloudinary_id,
    newPhoneNumber: phoneNumber,
    newAddress: address
  } = await request.json();
 
  await connectDB();
  try {
    await Post.findByIdAndUpdate(id, { title, content, image, cloudinary_id, phoneNumber, address });
  } catch (err) {
    return NextResponse.json({ message: "Unable to update post"}, { status: 404 })
  }
  return NextResponse.json({ message: "Post updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const post = await Post.findOne({ _id: id });
  console.log("POST:: ",post)
  return NextResponse.json({ post }, { status: 200 });
}
