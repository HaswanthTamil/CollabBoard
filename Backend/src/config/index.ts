import dotenv from "dotenv";
dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;
export const MONGO_URI = process.env.MONGO_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;

export const POSTGRES_URI = process.env.POSTGRES_URI!;
