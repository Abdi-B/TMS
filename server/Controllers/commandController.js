import Command from "../Models/commandModel.js";

const createCommand = async (req, res) => {
  try {
    // console.log(req.body);
    const { command, description, example } = req.body;

    const new_command = await Command.create({
      command,
      description,
      example,
    });

    console.log(new_command);
    res.status(200).json({
      status: "success",
      new_command,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the command.",
    });
  }
};

const getCommand = async (req, res) => {
  const commands = await Command.find();

  // console.log(user);

  res.status(200).json({
    status: "true",
    commands,
  });
};

export { createCommand, getCommand };
