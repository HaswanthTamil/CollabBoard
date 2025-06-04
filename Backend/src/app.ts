import { Hono } from "hono";
import { connectDB } from "./db/database.ts";
import { serve } from "@hono/node-server";
import { PORT } from "./config/index.ts";
// import authenticationRoutes from "./routes/authentication.ts";
import type { JwtVariables } from "hono/jwt";
import { cors } from 'hono/cors';
import mongoose from 'mongoose';
import { Pool } from 'pg';
import pocketRoutes from './routes/pocket-routes';
import projectRoutes from './routes/project-routes';
import taskRoutes from './routes/task-routes';
import noteRoutes from './routes/note-routes';
import authRoutes from './routes/authentication';

const app = new Hono<{ Variables: JwtVariables }>().basePath("/api");

// CORS middleware
app.use('*', cors());


// Postgres middleware: add the pool to context
// app.use('*', async (c, next) => {
//   c.set('pgPool', new Pool({ connectionString: postgresUri }));
//   await next();
// });

// Health check
app.get("/health", (c) => c.text("🚀 CollabBoard Backend Running!"));


// Route mounting
app.route('/auth', authRoutes);
app.route('/pockets', pocketRoutes);
app.route('/projects', projectRoutes);
app.route('/tasks', taskRoutes);
app.route('/notes', noteRoutes);


// Server and DB startup
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
