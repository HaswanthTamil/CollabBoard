import "reflect-metadata"; // Required for TypeORM :D
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PORT } from "./config/index";
import { connectToMongoDb, connectToPostgres } from "./db/database";
import { AppEnv } from "./types/common";
import { cors } from 'hono/cors';
import authRoutes from "./routes/authentication";
import pocketRoutes from './routes/pocket';
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';
// import noteRoutes from './routes/note';

const app = new Hono<AppEnv>().basePath("/api");

app.use('*', cors());

// Health check
app.get("/health", (c) => c.text("🚀 CollabBoard Backend Running!"));

// Route mounting
app.route('/auth', authRoutes);
app.route('/pockets', pocketRoutes);
app.route('/projects', projectRoutes);
app.route('/tasks', taskRoutes);
// app.route('/notes', noteRoutes);

// Server and DB startup
async function start() {
  console.log("⏳ Connecting to MongoDB...");
  await connectToMongoDb();

  console.log("⏳ Connecting to Postgres...");
  await connectToPostgres();

  console.log(`🚀 Starting server on port ${PORT}`);
  serve(app);
}

start().catch((err) => {
  console.error("Fatal error starting app:", err);
  process.exit(1);
});

export default app;
