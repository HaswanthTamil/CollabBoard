import type { Context } from 'hono';
import Project, { IProject } from '../db/models/Project';
import Task from '../db/models/Task';

export const createProject = async (c: Context): Promise<Response> => {
  try {
    const body = await c.req.json();
    const project: IProject = new Project({
      ...body,
      createdBy: c.get('user').id,
    });
    await project.save();
    return c.json(project, 201);
  } catch (error) {
    return c.json({ message: 'Error creating project', error }, 500);
  }
};

export const getProjects = async (c: Context): Promise<Response> => {
  try {
    const projects = await Project.find({ createdBy: c.get('user').id });
    return c.json(projects);
  } catch (error) {
    return c.json({ message: 'Error fetching projects', error }, 500);
  }
};

export const updateProject = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const body = await c.req.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true });
    if (!project) {
      return c.json({ message: 'Project not found' }, 404);
    }
    return c.json(project);
  } catch (error) {
    return c.json({ message: 'Error updating project', error }, 500);
  }
};

export const deleteProject = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param();
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return c.json({ message: 'Project not found' }, 404);
    }
    await Task.deleteMany({ projectId: id });
    return c.json({ message: 'Project and associated tasks deleted' });
  } catch (error) {
    return c.json({ message: 'Error deleting project', error }, 500);
  }
};