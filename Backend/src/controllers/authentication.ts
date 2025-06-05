import { Context } from "hono";
import postgresDataSource from "../db/postgres";
import { User } from "../db/postgres/entities/user";
import { HTTPException } from "hono/http-exception";
import { AuthContext, JWTPayload, LoginRequest, RegisterRequest, TokenPair } from "../types/authentication";
import * as argon2 from "argon2";
import { createSuccessResponse, sanatiseUser } from "../utils";
import { JWT_SECRET } from "../config";
import { sign } from "hono/jwt";
import { AppEnv } from "../types/common";

const userRepository = postgresDataSource.getRepository(User);

async function generateAccessToken(user: User): Promise<string> {
  const payload: Omit<JWTPayload, "iat"> = {
    sub: user.id,
    // 6 hour expirary, move to config later
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6
  };

  return sign(payload, JWT_SECRET, "HS256");
}

async function generateTokens(user: User): Promise<TokenPair> {
  const accessToken = await generateAccessToken(user);
  const refreshToken = ""; // Add refresh tokens in future

  return { accessToken, refreshToken };
}

export const register = async (c: Context) => {
  const body = await c.req.json<RegisterRequest>();

  const existingUser = await userRepository.findOne({
    where: { email: body.email, username: body.username }
  });

  if (existingUser) {
    throw new HTTPException(409, { message: "Email/username already registered" })
  }

  const hashedPassword = await argon2.hash(body.password);
  const user = userRepository.create({
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
    email: body.email,
    passwordHash: hashedPassword,
  });

  await userRepository.save(user);
  const tokens = await generateTokens(user);

  return c.json(createSuccessResponse({
    user: sanatiseUser(user),
    tokens,
  }));
};

export const login = async (c: Context) => {
  const body = await c.req.json<LoginRequest>();

  const user = await userRepository.findOne({
    where: { email: body.email ?? " ", username: body.username ?? " " }
  });

  if (!user) {
    throw new HTTPException(401, { message: 'Invalid credentials' });
  }

  const tokens = await generateTokens(user);

  return c.json(createSuccessResponse({
    user: sanatiseUser(user),
    tokens,
  }));
};

export const me = async (c: Context<AppEnv>) => {
  const authContext = c.get("authContext") as AuthContext;

  return c.json(createSuccessResponse(sanatiseUser(authContext.user)));
};

export const refresh = async (c: Context) => {
  return c.text("Route not implemented.");
};
