const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, },
    address: { type: String },
    phoneNumber: { type: String },
    image: { type: String },
    cloudinary_id: { type: String },
    addressLink: { type: String },
    phoneLink: { type: String },
    //create reference to User
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Post || mongoose.model("Post", Post);
