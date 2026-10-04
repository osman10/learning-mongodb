import app from "./app.js";
import { connectDB, env } from "./config/index.js";

const start = async () => {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`🚀 Server running on http://localhost:${env.port}`);
  });
};

start();
