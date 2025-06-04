import { Pool } from 'pg';

export interface IUser {
  id: number;
  email: string;
  password: string;
  created_at: Date;
}

export const createUser = async (pool: Pool, email: string, password: string): Promise<IUser> => {
  const result = await pool.query(
    'INSERT INTO users (email, password, created_at) VALUES ($1, $2, NOW()) RETURNING *',
    [email, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (pool: Pool, email: string): Promise<IUser | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};