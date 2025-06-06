import type { Context } from "hono";
import Task, { ITask } from "../db/models/Task";
import { AuthContext } from "../types/authentication";
import { Project } from "../db/postgres/entities/project";
import postgresDataSource from "../db/postgres";

const projectRepository = postgresDataSource.getRepository(Project);

export const createTask = async (c: Context): Promise<Response> => {
  try {
    const { projectId } = c.req.param();
    const authContext = c.get("authContext") as AuthContext;
    const userId = authContext.user.id;

    // 1. Verify project ownership
    const project = await projectRepository.findOne({
      where: { id: projectId, createdBy: { id: userId } },
    });

    if (!project) {
      return c.json({ message: "Project not found or access deneied" }, 403);
    }

    // 2. Create task
    const body = await c.req.json();
    const task: ITask = new Task({
      ...body,
      projectId,
      createdBy: userId,
    });

    await task.save();
    return c.json(task, 201);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating pocket", error);
      return c.json(
        { message: "Error creating task", error: error.message || error },
        500
      );
    } else {
      console.error("Task creation error:", error);
      return c.json({ message: "Error creating task", error }, 500);
    }
  }
};

export const getTask = async (c: Context): Promise<Response> => {
  try {
    const { projectId, id } = c.req.param();
    const authContext = c.get("authContext") as AuthContext;
    const userId = authContext.user.id;

    // 1. Verify project ownership
    const project = await projectRepository.findOne({
      where: { id: projectId, createdBy: { id: userId } },
    });
    if (!project) {
      return c.json({ message: "Project not found or access denied" }, 403);
    }

    // 2. Get task from MongoDB
    const task = await Task.findById(id);
    if (!task) {
      return c.json({ message: "Task not found" }, 404);
    }

    // 3. Ensure task belongs to this project
    if (task.projectId !== projectId) {
      return c.json({ message: "Task does not belong to this project" }, 403);
    }

    return c.json(task);
  } catch (error) {
    return c.json({ message: "Error fetching task", error }, 500);
  }
};

export const getTasks = async (c: Context): Promise<Response> => {
  try {
    const { projectId } = c.req.param();
    const authContext = c.get("authContext") as AuthContext;
    const userId = authContext.user.id;

    // 1. Verify project ownership
    const project = await projectRepository.findOne({
      where: { id: projectId, createdBy: { id: userId } },
    });
    if (!project) {
      return c.json({ message: "Project not found or access denied" }, 403);
    }

    // 2. Get tasks for that project and user
    const tasks = await Task.find({ projectId, createdBy: userId });
    return c.json(tasks);
  } catch (error) {
    return c.json({ message: "Error fetching tasks", error }, 500);
  }
};

export const updateTask = async (c: Context): Promise<Response> => {
  try {
    const { projectId, id } = c.req.param();
    const authContext = c.get("authContext") as AuthContext;
    const userId = authContext.user.id;
    const body = await c.req.json();

    // 1. Verify project ownership
    const project = await projectRepository.findOne({
      where: { id: projectId, createdBy: { id: userId } },
    });
    if (!project) {
      return c.json({ message: "Project not found or access denied" }, 403);
    }

    // 2. Get task from MongoDB
    const task = await Task.findById(id);
    if (!task) {
      return c.json({ message: "Task not found" }, 404);
    }

    // 3. Ensure task belongs to this project
    if (task.projectId !== projectId) {
      return c.json({ message: "Task does not belong to this project" }, 403);
    }

    const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
    return c.json(updatedTask);
  } catch (error) {
    return c.json({ message: "Error updating task", error }, 500);
  }
};

export const deleteTask = async (c: Context): Promise<Response> => {
  try {
    const { projectId, id } = c.req.param();
    const authContext = c.get("authContext") as AuthContext;
    const userId = authContext.user.id;

    // 1. Verify project ownership
    const project = await projectRepository.findOne({
      where: { id: projectId, createdBy: { id: userId } },
    });
    if (!project) {
      return c.json({ message: "Project not found or access denied" }, 403);
    }

    // 2. Get task from MongoDB
    const task = await Task.findById(id);
    if (!task || task.projectId !== projectId) {
      return c.json({ message: "Task not found in this project" }, 404);
    }

    // 3. Delete the task
    await Task.findByIdAndDelete(id);
    return c.json({ message: "Task deleted" });
  } catch (error) {
    return c.json({ message: "Error deleting task", error }, 500);
  }
};
