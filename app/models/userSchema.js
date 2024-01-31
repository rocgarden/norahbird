const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// var uniqueValidator = require("mongoose-unique-validator");

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

  //posts:{ type: String}
},
    { timestamps: true}
);

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.models.User || mongoose.model("User", User);
