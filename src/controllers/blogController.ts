import { db } from "../utils/db.server";
import type { Request, Response } from "express";

//create post
export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = await db.blogPost.create({
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    res
      .status(201)
      .json({ message: "Blog post succesfully created", newPost });
  } catch (error) {
    // throw error;
    res.status(500).json({ message: error });
  }
};

// read post
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await db.blogPost.findMany();
    res.status(201).json({ message: "Blog post succesfully retrived", posts });
  } catch (error) {
    // throw error;
    res.status(500).json({ message: error });
  }
};

// updatePost
export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await db.blogPost.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
      },
    });
    res.json({ message: "Blog post successfully updated", updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating blog post" });
  }
};

// delete post
export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.blogPost.delete({
      where: {
        id: id,
      },
    });
    res.json({ message: "Blog post successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting blog post" });
  }
};



export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      const post = await db.blogPost.findUnique({
          where: {
              id: id,
          },
      });
      if (!post) {
          res.status(404).json({ message: "Post not found" });
          return;
      }
      res.json(post);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching blog post" });
  }
};