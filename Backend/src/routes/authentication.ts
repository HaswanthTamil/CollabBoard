import { Hono } from "hono";
import { login, me, refresh, register } from "../controllers/authentication";
import { authMiddleware, jwtMiddleware } from "../middleware/authentication";
import { validationMiddleware } from "../middleware/validation";
import { loginSchema, registerSchema } from "../schemas/authentication";

const authRoutes = new Hono();

authRoutes.post("/register", validationMiddleware(registerSchema), register);
authRoutes.post("/login", validationMiddleware(loginSchema), login);
authRoutes.post("/refresh", refresh);

// Authenticated Routes
authRoutes.use("*", jwtMiddleware, authMiddleware);
authRoutes.get("/me", me);

export default authRoutes;