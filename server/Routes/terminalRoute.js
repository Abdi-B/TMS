import express from "express";
const app = express();
const router = express.Router();
import isAuthenticated from "../Middleware/authenticate.js";
import { isAuthorized } from "../Middleware/authorization.js";

import {
  createTerminal,
  getTerminal,
  getTerminalCounts,
  getSiteCounts,
  updateTerminal,
  deleteTerminal,
} from "../Controllers/terminalController.js";

// CREATE terminal
router
  .route("/createTerminal")
  .post(isAuthenticated, isAuthorized(), createTerminal);

// get terminals
router.route("/getTerminal").get(isAuthenticated, getTerminal);

// get terminal count of their respective type
router.route("/getTerminalCounts").get(isAuthenticated, getTerminalCounts);

//get site counts
router.route("/getSiteCounts").get(isAuthenticated, getSiteCounts);

//update/edit existing terminal
router
  .route("/updateTerminal/:id")
  .put(isAuthenticated, isAuthorized(), updateTerminal);

//delete existing terminal
router
  .route("/deleteTerminal/:id")
  .patch(isAuthenticated, isAuthorized(), deleteTerminal);

export default router;
