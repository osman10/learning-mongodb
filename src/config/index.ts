import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const required = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: required("MONGO_URI"),
  nodeEnv: process.env.NODE_ENV || "development",
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
