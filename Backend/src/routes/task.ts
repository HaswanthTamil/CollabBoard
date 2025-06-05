import { Hono } from 'hono';
import { authMiddleware, jwtMiddleware } from '../middleware/authentication';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task';

const router = new Hono();

router.use('*', jwtMiddleware, authMiddleware);

router.post('/:projectId', createTask);
router.get('/:projectId', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;