import { Hono } from 'hono';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/project';
import { jwtMiddleware, authMiddleware } from '../middleware/authentication';

const router = new Hono();

router.use('*', jwtMiddleware, authMiddleware);

router.post('/', createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;