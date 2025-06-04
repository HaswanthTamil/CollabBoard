import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["to-do", "in-progress", "done"], default: "to-do" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    color: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
