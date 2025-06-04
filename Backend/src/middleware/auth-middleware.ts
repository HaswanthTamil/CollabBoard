import type{ Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.ts';

export const authMiddleware = async (c: Context, next: Next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return c.json({ message: 'No token provided' }, 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    c.set('user', decoded);
    await next();
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401);
  }
};