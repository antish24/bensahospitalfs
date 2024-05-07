import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String},

  email: { type: String, unique: true},
  password: { type: String },
  role: { type: String },

  token: { type: String, default: null },

  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);