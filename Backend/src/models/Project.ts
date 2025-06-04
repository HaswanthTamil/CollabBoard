import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  createdBy: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', ProjectSchema);