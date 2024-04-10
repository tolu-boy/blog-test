
import {db} from "../utils/db.server"
import type { Request, Response } from "express";

export type User = {
    name: string;
    email :string
  };

export const getUsers = async (req: Request, res: Response) :Promise<void> => {
    try {
        const users : User[]   = await db.user.findMany({
            select: {
                name: true,
                email: true,
            }
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};