import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { createTask, getTasks, updateTask, deleteTask } from '../controller/task-controller';

const router = new Hono();

router.use('*', authMiddleware);

router.post('/:projectId', createTask);
router.get('/:projectId', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;