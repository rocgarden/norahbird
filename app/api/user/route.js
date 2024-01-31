import connectDB from "@/app/lib/mongoDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/app/models/userSchema";

export async function POST(req) {
  const { name, email , role} = await req.json();

  try {
    await connectDB();
    await User.create({ name, email,role });

    return NextResponse.json({
      msg: ["User  created"],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ msg: errorList });
    } else {
      console.log(error)
      return NextResponse.json({ msg: ["Unable to create user."] });
    }
  }
}

export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDB();
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}
