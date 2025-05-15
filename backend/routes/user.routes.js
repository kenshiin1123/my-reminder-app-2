import express from "express";
import { verifyAccessToken } from "../controller/auth.controller.js";
const router = express.Router();

import {
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";

router.use(verifyAccessToken);

router.route("").get(getUser).put(updateUser).delete(deleteUser);

export default router;
