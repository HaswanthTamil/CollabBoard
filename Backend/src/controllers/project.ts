import type { Context } from 'hono'
import postgresDataSource from '../db/postgres'
import { Project } from '../db/postgres/entities/project'
import { AppEnv } from '../types/common'

const projectRepository = postgresDataSource.getRepository(Project)

export const createProject = async (c: Context<AppEnv>): Promise<Response> => {
  try {
    const body = await c.req.json()
    const authContext = c.get('authContext')
    const project = projectRepository.create({
      name: body.name,
      createdBy: authContext.user,
    })

    await projectRepository.save(project)
    return c.json(project, 201)
  } catch (error) {
    return c.json({ message: 'Error creating project', error }, 500)
  }
}

export const getProjects = async (c: Context<AppEnv>): Promise<Response> => {
  try {
    const authContext = c.get('authContext')
    const projects = await projectRepository.find({
      where: { createdBy: { id: authContext.user.id } },
    })

    return c.json(projects, 200)
  } catch (error) {
    return c.json({ message: 'Error fetching projects', error }, 500)
  }
}

export const updateProject = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param()
    const body = await c.req.json()

    const project = await projectRepository.update({ id: id }, body)

    return c.json(project)
  } catch (error) {
    return c.json({ message: 'Error updating project', error }, 500)
  }
}

export const deleteProject = async (c: Context): Promise<Response> => {
  try {
    const { id } = c.req.param()

    await projectRepository.delete({
      id: id,
    })

    return c.json({ message: 'Project and associated tasks deleted' })
  } catch (error) {
    return c.json({ message: 'Error deleting project', error }, 500)
  }
}
