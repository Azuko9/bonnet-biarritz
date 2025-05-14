// src/models/Profile.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  firstName: string;
  lastName: string;
  profession: string;
  photoUrl: string;
  phone: string;
  email: string;
}

const ProfileSchema = new Schema<IProfile>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profession: { type: String, required: true },
    photoUrl: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
