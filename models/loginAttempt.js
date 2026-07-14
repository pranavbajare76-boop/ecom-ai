import mongoose from "mongoose";

const LoginAttemptSchema = new mongoose.Schema({
  email: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const LoginAttempt = mongoose.models.LoginAttempt || mongoose.model("LoginAttempt", LoginAttemptSchema);
export default LoginAttempt;
