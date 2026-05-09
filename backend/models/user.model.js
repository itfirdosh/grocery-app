import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // ✅ FIXED
  },
  email: {
    type: String,
    required: true,   // ✅ FIXED
    unique: true,
  },
  password: {
    type: String,
    required: true,   // ✅ FIXED
  },
  cartItems: { type: Object, default: {} },
},
{ minimize: false }
);

// ✅ FIXED (capital U)
const User = mongoose.model("User", userSchema);

export default User;