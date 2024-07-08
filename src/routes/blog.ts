import express from "express";

import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById
} from "../controllers/blogController";

// const {verifyToken} =  require("../middleware/verifyToken")

const { verifyToken } = require("../middleware/verifyToken");
export const blogRouter = express.Router();

// You can remove the verify token middleware to test with authorization.
blogRouter.post("/create", verifyToken, createPost);
blogRouter.get("/read", getPosts);
blogRouter.get("/read/:id", getPostById);
blogRouter.patch("/:id", verifyToken, updatePost);
blogRouter.delete("/:id", verifyToken, deletePost);
