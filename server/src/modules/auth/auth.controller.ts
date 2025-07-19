import { Request, Response } from "express";
import User from "../user/user.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const signUp = async (req: Request, res: Response) => {
  try {
    console.log("req.body", req.body);
    const { firstName, lastName } = req.body;

    const existing = await User.findOne({ firstName, lastName });
    if (existing) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const newUser = await User.create(req.body);
    console.log("newUser", newUser);
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id.toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error: any) {
    console.error("[REGISTER ERROR]", error.message);
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { firstName, lastName, password } = req.body;

  const user = await User.findOne({ firstName, lastName });

  const imagePath = user?.image
    ? `${req.protocol}://${req.get("host")}/uploads/${user?.image}`
    : null;
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: user.birthdate,
      imageUrl: imagePath,
    },
  });
};
