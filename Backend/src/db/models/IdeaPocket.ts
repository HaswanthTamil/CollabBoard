import mongoose, { Schema, Document } from 'mongoose';

export interface IIdeaPocket extends Document {
  name: string;
  createdBy: string;
  isPublic: boolean;
  createdAt: Date;
}

const IdeaPocketSchema: Schema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IIdeaPocket>('IdeaPocket', IdeaPocketSchema);