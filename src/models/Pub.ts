import mongoose, { Schema, Document } from "mongoose";

export interface IPub extends Document {
  title: string;
  imageUrl: string;
  link?: string;
  order: number; // pour ordonner les pubs sur la home
}

const PubSchema = new Schema<IPub>(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Pub || mongoose.model<IPub>("Pub", PubSchema);
