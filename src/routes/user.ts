import express from "express";
import {getUsers, welcome} from "../controllers/userController";


export const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/welcome", welcome);

