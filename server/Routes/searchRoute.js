import express from "express";
const app = express();
const router = express.Router();

import { search } from "../Controllers/searchController.js";

// CREATE terminal
router.route("/").get(search);

export default router;
