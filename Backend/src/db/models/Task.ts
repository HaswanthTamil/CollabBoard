import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  projectId: string;
  createdBy: string;
  color?: string;
  icon?: string;
  createdAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  projectId: { type: String, required: true },
  createdBy: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITask>('Task', TaskSchema);