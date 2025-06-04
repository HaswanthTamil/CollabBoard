import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { createProject, getProjects, updateProject, deleteProject } from '../controller/project-controller';

const router = new Hono();

router.use('*', authMiddleware);

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;