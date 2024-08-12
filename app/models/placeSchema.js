const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Place = new Schema(
  {
    placeName: { type: String, required: true },
    category: { type: String },
    placeAddress: { type: String },
    imageURL: { type: String },
    addressLink: { type: String },
    phoneLink: { type: String },
    //create reference to User
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Place || mongoose.model("Place", Place);
