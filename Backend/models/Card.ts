import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    content: { type: String },
    imageUrl: { type: String },
    fileUrl: { type: String },
    pocketId: { type: mongoose.Schema.Types.ObjectId, ref: "IdeaPocket", required: true },
    links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
  },
  { timestamps: true }
);

export default mongoose.model("Card", cardSchema);
