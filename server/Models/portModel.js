import mongoose from "mongoose";

const portSchema = new mongoose.Schema(
  {
    portName: {
      type: String,
      unique: true,
      required: [true, "Please enter port command."],
    },
    portNumber: {
      type: Number,
      unique: true,
      required: [true, "Please enter port number."],
    },
    portAssignment: {
      type: String,
      required: [true, "Please enter port type assignment."],
    },
    portSiteAssignment: {
      type: String,
      required: [true, "Please enter port site assignment."],
    },
    usedPorts: {
      type: Number,
      default: 0,
    },
    portCapacity: {
      type: Number,
      required: [true, "Please enter port capacity."],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, "Creater user id is required"],
    },
  },
  { timestamps: true }
);

portSchema.pre("save", function (next) {
  if (!this.portAssignment || this.portAssignment.length === 0) {
    this.portAssignment = ["NCR", "CRM"];
  }
  if (!this.portSiteAssignment || this.portSiteAssignment.length === 0) {
    this.portSiteAssignment = ["ONSITE", "OFFSITE"];
  }
  next();
});

const Port = mongoose.model("Port", portSchema);

export default Port;
