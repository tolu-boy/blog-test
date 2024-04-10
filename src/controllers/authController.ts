import { db } from "../utils/db.server";
import type { Request, Response } from "express";
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

export type User = {
  name: string;
  email: string;
  password: string;
  id: string;
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const newUser = await db.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: CryptoJs.AES.encrypt(
          req.body.password,
          process.env.SECRET
        ).toString(),
      },
    });
    res.status(201).json({ message: "user succesfully created", newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


export const loginUsers = async (req: Request, res: Response)=>{  

    try {
      const user   = await db.user.findUnique({
        where: {
          email: req.body.email
        },
        select: {
          email: true,
          password: true,
          id:true
        },
      })

    !user && res.status(401).json("could not find a user");
           const decryptedPassword = CryptoJs.AES.decrypt(
           user.password,
          process.env.SECRET
        );

        const theRealPassword = decryptedPassword.toString(CryptoJs.enc.Utf8);
        theRealPassword !== req.body.password && res.status(401).json("wrong username or password");

         const userToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "21d" }
        );
                const { password, ...others } = user ;

  
     res.status(200).json({ message: "user sign in sucesss",...others, token: userToken });

    } catch (error) {
        console.log(error);
        res.status(500).json("could not login check your credentials");
    }
 

    // try {
    //     const user = await User.findOne({ email: req.body.email });
    //     console.log(user);
    //     !user && res.status(401).json("could not find a user");
    //     const decryptedPassword = CryptoJs.AES.decrypt(
    //       user.password,
    //       process.env.SECRET
    //     );
    //     const theRealPassword = decryptedPassword.toString(CryptoJs.enc.Utf8);
    //     theRealPassword !== req.body.password &&
    //       res.status(401).json("wrong username or password");
    //     const userToken = jwt.sign(
    //       {
    //         id: user._id,
    //       },
    //       process.env.JWT_SECRET,
    //       { expiresIn: "21d" }
    //     );
  
    //     const { password, __v, createdAt, updatedAt, ...others } = user._doc;
  
    //     res.status(200).json({ ...others, token: userToken });
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json("could not login check your credentials");
    //   }
}