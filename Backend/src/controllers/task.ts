import type { Context } from 'hono';
import Task, { ITask } from '../db/models/Task';

export const createTask = async (c: Context): Promise<Response> => {
  try {
    const { projectId } = c.req.param();
    const body = await c.req.json();
    const task: ITask = new Task({
      ...body,
      projectId,
      createdBy: c.get('user').id,
    });
    await task.save();
    return c.json(task, 201);
  } catch (error) {
    return c.json({ message: 'Error creating task', error }, 500);
  }
};

export const getTask = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const task = await Task.findById(id);
    if(!task) {
      return c.json({message: 'Task not found'}, 404);
    }
    return c.json(task);
  } catch (error) {
    return c.json({message: 'Error fetching task', error}, 500);
  }
}

export const getTasks = async (c: Context): Promise<Response> => {
  try {
    const { projectId } = c.req.param();
    const tasks = await Task.find({ projectId });
    return c.json(tasks);
  } catch (error) {
    return c.json({ message: 'Error fetching tasks', error }, 500);
  }
};

export const updateTask = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const task = await Task.findByIdAndUpdate(id, body, { new: true });
    if (!task) {
      return c.json({ message: 'Task not found' }, 404);
    }
    return c.json(task);
  } catch (error) {
    return c.json({ message: 'Error updating task', error }, 500);
  }
};

export const deleteTask = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return c.json({ message: 'Task not found' }, 404);
    }
    return c.json({ message: 'Task deleted' });
  } catch (error) {
    return c.json({ message: 'Error deleting task', error }, 500);
  }
};