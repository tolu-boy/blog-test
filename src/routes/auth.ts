import express from "express";
import { createUsers, loginUsers } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", createUsers);
authRouter.post("/login", loginUsers);
