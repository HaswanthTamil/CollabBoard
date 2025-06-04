import mongoose from "mongoose";

const ideaPocketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    visibility: { type: String, enum: ["private", "public"], default: "private" },
  },
  { timestamps: true }
);

export default mongoose.model("IdeaPocket", ideaPocketSchema);
