import Terminal from "../Models/terminalModel.js";

const search = async (req, res) => {
  try {
    const { query } = req.body;

    console.log("query", query);

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const regex = new RegExp(query, "i"); // Case-insensitive regex

    // const userResults = await User.find({
    //   $or: [{ username: regex }, { email: regex }],
    // });
    const terminalResults = await Terminal.find({
      $or: [{ id: regex }, { type: regex }],
    });
    // const functionalityResults = await Functionality.find({
    //   $or: [{ name: regex }, { description: regex }],
    // });

    const results = {
      //   users: userResults,
      terminals: terminalResults,
      //   functionalities: functionalityResults,
    };

    res.status(200).json(results);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Server error during search" });
  }
};

export { search };
