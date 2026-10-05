import app from "./app.js";
import { connectDB, env } from "./config/index.js";

const start = async () => {
  await connectDB();

  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
  });
};

start();
