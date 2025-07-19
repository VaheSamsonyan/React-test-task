import express from "express";
import cors from "cors";

import { connectDB } from "@/config/db";
import ProductRoutes from "@/modules/product/product.routes";
import UserRoutes from "@/modules/user/user.routes";
import AuthRoutes from "@/modules/auth/auth.routes";
import { authMiddleware } from "@/modules/auth/auth.middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", authMiddleware, ProductRoutes);
app.use("/api/user", authMiddleware, UserRoutes);
app.use("/api/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });
