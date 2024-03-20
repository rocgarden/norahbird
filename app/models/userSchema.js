const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  role: { type: String, required:true},
  //create reference to images
  // images: [{ type: mongoose.Types.ObjectId, ref: "Image"}],
    //create reference to Posts 
  posts:[{ type: mongoose.Types.ObjectId, ref: 'Post'}]
},
    { timestamps: true}
);
module.exports = mongoose.models.User || mongoose.model("User", User);
