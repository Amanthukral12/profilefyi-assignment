import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  email: string;
  name: string;
  image: string;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<User>("User", UserSchema);
