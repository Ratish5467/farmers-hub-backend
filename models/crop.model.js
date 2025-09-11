import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  variety: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true
});

export const Crop = mongoose.model("Crop", cropSchema);
