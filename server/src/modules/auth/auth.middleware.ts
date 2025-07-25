import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
