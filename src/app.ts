import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

export default app;
