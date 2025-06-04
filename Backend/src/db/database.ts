import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.ts";
import postgresDataSource from "./postgres/index.ts";

export async function connectToMongoDb() {
  return mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
}

export async function connectToPostgres() {
  return postgresDataSource
    .initialize()
    .then(() => console.log("✅ Postgres connected"))
    .catch((err) => console.error("❌ Postgres connection failed:", err));
}
