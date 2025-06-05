import { jwt } from "hono/jwt";
import { HTTPException } from 'hono/http-exception';
import { JWT_SECRET } from "../config";
import { Context, Next } from "hono";
import { AuthContext, JWTPayload } from "../types/authentication";
import postgresDataSource from "../db/postgres";
import { User } from "../db/postgres/entities/user";

export const jwtMiddleware = jwt({
    secret: JWT_SECRET,
    cookie: "accessToken",
});

export async function authMiddleware(c: Context, next: Next) {
    try {
        const payload = c.get("jwtPayload") as JWTPayload;

        if (!payload) {
            throw new HTTPException(401, { message: "Invalid token" });
        }

        const userRepository = postgresDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: payload.sub },
        })

        if (!user) {
            throw new HTTPException(401, { message: "No user found matching the token" });
        }

        const authContext: AuthContext = { user, payload };
        c.set("authContext", authContext);

        await next();
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }

        throw new HTTPException(401, { message: "Authentication failed" });
    }
};