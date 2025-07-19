import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { CreateUserDto } from "./user.types";

export interface UserDocument extends CreateUserDto, Document {
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date },
    image: { type: String },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return await bcrypt.compare(candidate, this.password);
};

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema,
);
export default User;
