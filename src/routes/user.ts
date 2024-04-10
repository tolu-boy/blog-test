import express from "express";
import {getUsers} from "../controllers/userController";


export const userRouter = express.Router();

userRouter.get("/", getUsers);
