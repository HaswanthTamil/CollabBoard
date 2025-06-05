import mongoose, { Schema, Document } from 'mongoose';

export interface ICard extends Document {
  title: string;
  content: string;
  pocketId: string;
  createdBy: string;
  links?: string[];
  createdAt: Date;
}

const CardSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  pocketId: { type: String, required: true },
  createdBy: { type: String, required: true },
  links: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICard>('Card', CardSchema);