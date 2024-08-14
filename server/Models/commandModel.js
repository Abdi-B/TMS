import mongoose from "mongoose";

const commandSchema = mongoose.Schema(
  {
    command: {
      type: String,
      unique: true,
      required: [true, "Please enter command."],
    },
    description: {
      type: String,
      required: [true, "Please enter description."],
    },
    example: {
      type: String,
      required: [true, "Please enter example."],
    },
    // createdby: {
    //   type: String,
    //   required: [true, "Created user id is required"],
    // },
  },
  { timestamps: true }
);

const Command = mongoose.model("Command", commandSchema);

export default Command;
