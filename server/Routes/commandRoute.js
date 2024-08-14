import express from "express";
const app = express();
const router = express.Router();

import { createCommand, getCommand } from "../Controllers/commandController.js";

// CREATE command
router.route("/createCommand").post(createCommand);

// get command
router.route("/getCommand").get(getCommand);

export default router;
