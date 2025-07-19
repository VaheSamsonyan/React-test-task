import { Request, Response } from "express";
import * as userService from "./user.service";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getById(req.params.id);
    const imagePath = user?.image
      ? `${req.protocol}://${req.get("host")}/uploads/${user?.image}`
      : null;
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ ...user.toObject(), imageUrl: imagePath });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const data: any = { ...req.body };
    if (req.file) {
      data.image = req.file.filename;
    } else {
      delete data.image;
      delete data.image;
    }
    const updated = await userService.update(req.params.id, data);
    res.json(updated);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.remove(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
