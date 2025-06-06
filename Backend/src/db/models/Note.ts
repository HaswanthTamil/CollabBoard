import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
