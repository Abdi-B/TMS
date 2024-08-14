import mongoose from "mongoose";

const UserActivityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    action: { type: String, required: true },
    description: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

const UserActivityLog = mongoose.model(
  "UserActivityLog",
  UserActivityLogSchema
);

export default UserActivityLog;
