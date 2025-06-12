import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the .env file");
}
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the .env file");
}
if (!process.env.POSTGRES_URI) {
  throw new Error("POSTGRES_URI is not defined in the .env file");
}

export const NODE_ENV = process.env.NODE_ENV || "development";
export const VERCEL_DEPLOYMENT = process.env.VERCEL_DEPLOYMENT ?? false;
export const PORT = Number(process.env.PORT) || 3000;

export const JWT_SECRET = process.env.JWT_SECRET;
export const MONGO_URI = process.env.MONGO_URI;
export const POSTGRES_URI = process.env.POSTGRES_URI;
