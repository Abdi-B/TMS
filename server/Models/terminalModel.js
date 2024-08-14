import mongoose from "mongoose";

const terminalSchema = mongoose.Schema(
  {
    unitId: {
      type: Number,
      required: [true, "Please enter terminal Unit ID."],
    },
    type: {
      type: String,
      required: [true, "Please enter terminal type."],
      enum: ["CRM", "NCR"],
    },
    terminalId: {
      type: String,
      required: [true, "Please enter terminal Id"],
    },
    terminalName: {
      type: String,
      required: [true, "Please enter terminal name."],
    },
    branchName: {
      type: String,
      required: [true, "Please enter branch name."],
    },
    district: {
      type: String,
      required: [true, "Please enter district."],
    },
    site: {
      type: String,
      required: [true, "Please enter terminal site."],
    },
    cbsAccount: {
      type: String,
      unique: true,
      required: [true, "Please enter cbs account."],
    },
    port: {
      type: Number,
      required: [true, "Please enter port number."],
    },
    ipAddress: {
      type: String,
      unique: true,
      required: [true, "Please enter ip Address."],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Creater user id is required"],
    },
    status: {
      type: String,
      default: "New",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

terminalSchema.index({ unitId: 1, type: 1 }, { unique: true });

const Terminal = mongoose.model("Terminal", terminalSchema);

export default Terminal;
