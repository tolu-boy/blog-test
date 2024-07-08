import express from "express";
import { getUsers} from "../controllers/userController";
const { verifyToken } = require("../middleware/verifyToken");

export const userRouter = express.Router();

userRouter.get("/",verifyToken, getUsers);
