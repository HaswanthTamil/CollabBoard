import { Hono } from "hono";
import { connectDB } from "./db/database.ts";
import { serve } from "@hono/node-server";
import { PORT } from "./config/index.ts";
import authenticationRoutes from "./routes/authentication.ts";
import { JwtVariables } from "hono/jwt";

const app = new Hono<{ Variables: JwtVariables }>().basePath("/api");

app.get("/health", (c) => c.text("🚀 CollabBoard Backend Running!"));
app.route("/", authenticationRoutes);

async function start() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await connectDB();

    console.log(`🚀 Starting server on port ${PORT}`);
    serve(app);
  } catch (err) {
    console.error("❌ Error in start():", err);
    process.exit(1);
  }
}

start().catch((err) => {
  console.error("Fatal error starting app:", err);
  process.exit(1);
});

export default app;
