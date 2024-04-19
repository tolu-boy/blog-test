import express from "express";
import {createAppointments} from "../controllers/appointmentController";


export const appointmentRouter = express.Router();

appointmentRouter.post("/create", createAppointments);
