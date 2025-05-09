import express from "express";
const router = express.Router();

import {
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

router.route("").get(getUser).put(updateUser).delete(deleteUser);

export default router;
