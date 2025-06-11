import "reflect-metadata"; // Required for TypeORM :D
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { PORT, VERCEL_DEPLOYMENT } from "./config/index";
import { connectToMongoDb, connectToPostgres } from "./db/database";
import { AppEnv } from "./types/common";
import { cors } from 'hono/cors';
import authRoutes from "./routes/authentication";
import pocketRoutes from './routes/pocket';
import projectRoutes from './routes/project';
import taskRoutes from './routes/task';
import { handle } from "hono/vercel";
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


export let GET: (req: Request) => Response | Promise<Response>;
export let POST: (req: Request) => Response | Promise<Response>;
export let PATCH: (req: Request) => Response | Promise<Response>;
export let PUT: (req: Request) => Response | Promise<Response>;
export let OPTIONS: (req: Request) => Response | Promise<Response>;
export let DELETE: (req: Request) => Response | Promise<Response>;

if (VERCEL_DEPLOYMENT) {
  const handler = handle(app);
  GET = handler;
  POST = handler;
  PATCH = handler;
  PUT = handler;
  OPTIONS = handler;
  DELETE = handler;
} else {
  start().catch((err) => {
    console.error("Fatal error starting app:", err);
    process.exit(1);
  });
}

export default app;
