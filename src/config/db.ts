import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoUri = process.env.MONGODB_URI ?? process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
  if (!mongoUri) {
    throw new Error("MONGODB_URI or MONGO_URI is not defined in the environment variables.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
