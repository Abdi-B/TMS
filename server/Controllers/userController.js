import User from "../Models/userModel.js";
import UserActivityLog from "../Models/userActivityLogModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// create json web token 30 -means 30 days
const maxAge = 1 * 24 * 60 * 60;
export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const createUser = async (req, res) => {
  try {
    let createdBy = req.auth_user._id;
    const {
      firstName,
      fatherName,
      gfatherName,
      email,
      department,
      role,
      username,
      password,
    } = req.body;

    // Check for existing email and username, including soft-deleted users
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail && !existingEmail.isDeleted) {
      return res.status(409).json({ message: "Email already in use" });
    }

    if (existingUsername && !existingUsername.isDeleted) {
      return res.status(409).json({ message: "Username already in use" });
    }

    // If the email exists but is soft-deleted, reactivate the user
    if (existingEmail && existingEmail.isDeleted) {
      existingEmail.firstName = firstName;
      existingEmail.fatherName = fatherName;
      existingEmail.gfatherName = gfatherName;
      existingEmail.department = department;
      existingEmail.role = role;
      existingEmail.username = username;
      existingEmail.password = await bcrypt.hash(password, 13); // Rehash the password
      existingEmail.status = "New";
      existingEmail.isDeleted = false;
      existingEmail.createdBy = createdBy;

      // Save the reactivated user
      await existingEmail.save();

      // Log the activity
      await UserActivityLog(
        createdBy,
        "reactivate_user",
        "User reactivated",
        req
      );

      console.log("User reactivated successfully:", existingEmail);
      return res.status(200).json({
        status: "success",
        user: existingEmail,
        message: "User reactivated successfully.",
      });
    }

    // Hash the password for a new user
    const hashPassword = await bcrypt.hash(password, 13);
    console.log("Hashed password:", hashPassword);

    // Log the activity for creating a new user
    await UserActivityLog(
      createdBy,
      "create_record",
      "User created a new user record",
      req
    );

    // Create a new user
    const user = await User.create({
      firstName,
      fatherName,
      gfatherName,
      email,
      department,
      role,
      username,
      password: hashPassword,
      createdBy,
    });

    // Respond with success
    console.log("User created successfully:", user);
    res.status(201).json({
      status: "success",
      user,
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error creating a user:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the user.",
      error: error.message, // Include error message for debugging
    });
  }
};

const getUser = async (req, res) => {
  const users = await User.find({ isDeleted: false });

  // console.log(user);

  res.status(200).json({
    status: "true",
    users,
  });
};

const getUserProfile = async (req, res) => {
  let user = req.auth_user;

  res.status(200).json({
    status: "true",
    user,
  });
};

const getUserRole = async (req, res) => {
  let role = req.auth_user.role;

  res.status(200).json({
    status: "true",
    role,
  });
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      username: username,
      isDeleted: false,
    }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Username or password is incorrect." });
    }

    if (user.wrongPasswordCount > 4) {
      return res.status(401).json({
        message: "Your account is locked! Please contact your administrator.",
      });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // res.send("wrong password");
      user.wrongPasswordCount += 1;
      await user.save();
      console.log("password is not correct.");
      return res.status(401).json({
        message: `Wrong password! You are left with ${
          5 - user.wrongPasswordCount
        } tries.`,
      });
    }

    user.wrongPasswordCount = 0;
    await user.save();

    // Login successful
    // Generate JWT token or set session
    // Return response
    const token = createToken(user);

    res.header("token", token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    // Log the successful login activity
    const newLog = new UserActivityLog({
      userId: user._id,
      action: "login",
      description: "User logged in successfully",
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    await newLog.save();

    return res.status(200).json({
      token: token,
      message: "User logged in successfully",
      data: user,

      // console.log(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while logging in the user.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Validate user ID (you can use a more robust validation if needed)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user details to check their role
    const user = await User.findById(userId);

    // If the user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user's role is superadmin
    if (user.role === "superadmin") {
      return res.status(403).json({ message: "Superadmin cannot be deleted." });
    }

    // Perform a soft delete if the role is not superadmin
    const response = await User.findByIdAndUpdate(
      userId,
      { status: "Deleted", isDeleted: true },
      { new: true }
    );

    // Return a success response
    res.status(200).json({ message: "User marked as deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetCount = async (req, res) => {
  console.log("inside resetCount controller");
  try {
    // Extract terminal ID from request parameters
    const userId = req.params.id;

    // Validate terminal ID (you can use a more robust validation if needed)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Interact with the database to perform a soft delete
    const result = await User.findByIdAndUpdate(
      userId,
      { wrongPasswordCount: 0 },
      { new: true }
    );

    // If the terminal does not exist
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success response
    res.status(200).json({ message: "User password is resetted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error resetting user password:", error);
    res.status(500).json({ message: "Error while unlocking the user." });
  }
};

const resetPassword = async (req, res) => {
  console.log("Inside resetPassword controller");
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;

    // Validate user ID (you can use a more robust validation if needed)
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the user details
    const user = await User.findById(userId);

    // If the user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Set the default password and hash it
    const defaultPassword = "12341234";
    const hashPassword = await bcrypt.hash(defaultPassword, 13);

    // Update the user's role and status
    if (user.role === "admin") {
      user.role = "tempo_admin";
    } else if (user.role === "user") {
      user.role = "tempo_user";
    } else if (user.role === "superadmin") {
      user.role = "tempo_superadmin";
    }

    user.password = hashPassword;
    user.status = "New";
    user.wrongPasswordCount = 0;

    // Save the updated user data
    await user.save();

    // Log the password reset activity
    await UserActivityLog(
      user._id,
      "reset_password",
      "User reset their password",
      req
    );

    // Respond with success
    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    // Handle any errors
    console.error("Error resetting user password:", error);
    res.status(500).json({ message: "Error while resetting user password." });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Ensure that the user is authenticated
    console.log("logged", req.auth_user);
    if (!req.auth_user || !req.auth_user._id) {
      return res
        .status(401)
        .json({ error: "User is not authenticated ." })
        .end();
    }

    // Log the activity
    const newLog = new UserActivityLog({
      userId: req.auth_user._id,
      action: "logout",
      description: "User logged out",
      ipAddress: req.ip,
      userAgent: req.get("User-Agent"),
    });

    // Save the log to the database
    await newLog.save();

    // Clear the JWT cookie and send the response
    return res
      .cookie("jwt", "", { maxAge: 1, httpOnly: true, secure: true }) // Secure flag should be true in production
      .status(200)
      .json({
        status: "Logged out",
        message: "User logged out successfully!",
      })
      .end();
  } catch (error) {
    console.error("Error while logging out:", error);
    return res.status(500).json({ error: "Error while logging out!" }).end();
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { password, newPassword, confirmNewPassword } = req.body;
    const user = req.auth_user;

    // Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ status: "false", message: "New passwords do not match" });
    }

    // Find the user by _id
    const foundUser = await User.findOne({
      _id: user._id,
      isDeleted: false,
    }).select("+password");
    if (!foundUser) {
      return res
        .status(404)
        .json({ status: "false", message: "User not found" });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "false", message: "Incorrect current password" });
    }

    // Hash the new password
    foundUser.password = await bcrypt.hash(newPassword, 13);

    // Change the status to active if it is "New"
    if (foundUser.status === "New") {
      foundUser.status = "Active";
    }

    if (foundUser.role == "tempo_user") {
      foundUser.role = "user";
    } else if (foundUser.role == "tempo_admin") {
      foundUser.role = "admin";
    } else {
      foundUser.role = "superadmin";
    }

    // Save the updated user
    await foundUser.save();

    res.status(200).json({
      // token: token,
      status: "true",
      message: "Password updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("forgot password error", error);
    res.status(500).json({
      status: "false",
      message: "Internal server error to forgot the password.",
    });
  }
};

export {
  createUser,
  loginUser,
  getUser,
  getUserProfile,
  deleteUser,
  logoutUser,
  getUserRole,
  resetCount,
  forgotPassword,
  resetPassword,
};
