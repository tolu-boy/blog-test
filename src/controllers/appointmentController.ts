import { db } from "../utils/db.server";
import type { Request, Response } from "express";


export const createAppointments = async (req: Request, res: Response) => {
     
    try {
        const newAppointment = await db.appointment.create({
            data: {
                email:req.body.email,
                name:req.body.name,
                phone:req.body.phone,
                address:req.body.address,
                date:req.body.date,
            },
          });
          res.status(201).json({ message: "appointment succesfully created", newAppointment });

        
    } catch (error) {
        // throw error;
        res.status(500).json({ message: error });

    }

}
