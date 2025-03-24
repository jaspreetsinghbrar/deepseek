import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: string, required: true },
    name: { type: string, required: true },
    email: { type: string, required: true },
    image: { type: string, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
