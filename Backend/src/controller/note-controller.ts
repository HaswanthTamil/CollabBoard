import type { Context } from 'hono';
import { Pool } from 'pg';

export const createNote = async (c: Context): Promise<Response> => {
  try {
    const pool = c.get('pgPool') as Pool;
    const { title, content } = await c.req.json();
    const userId = c.get('user').id;
    const result = await pool.query(
      'INSERT INTO notes (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [title, content, userId]
    );
    return c.json(result.rows[0], 201);
  } catch (error) {
    return c.json({ message: 'Error creating note', error }, 500);
  }
};

export const getNotes = async (c: Context): Promise<Response> => {
  try {
    const pool = c.get('pgPool') as Pool;
    const userId = c.get('user').id;
    const result = await pool.query('SELECT * FROM notes WHERE user_id = $1', [userId]);
    return c.json(result.rows);
  } catch (error) {
    return c.json({ message: 'Error fetching notes', error }, 500);
  }
};

export const updateNote = async (c: Context): Promise<Response> => {
  try {
    const pool = c.get('pgPool') as Pool;
    const { id } = c.req.param();
    const { title, content } = await c.req.json();
    const userId = c.get('user').id;
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *',
      [title, content, id, userId]
    );
    if (result.rowCount === 0) {
      return c.json({ message: 'Note not found' }, 404);
    }
    return c.json(result.rows[0]);
  } catch (error) {
    return c.json({ message: 'Error updating note', error }, 500);
  }
};

export const deleteNote = async (c: Context): Promise<Response> => {
  try {
    const pool = c.get('pgPool') as Pool;
    const { id } = c.req.param();
    const userId = c.get('user').id;
    const result = await pool.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    if (result.rowCount === 0) {
      return c.json({ message: 'Note not found' }, 404);
    }
    return c.json({ message: 'Note deleted' });
  } catch (error) {
    return c.json({ message: 'Error deleting note', error }, 500);
  }
};