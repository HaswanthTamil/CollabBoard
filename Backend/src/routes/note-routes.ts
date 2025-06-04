import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { createNote, getNotes, updateNote, deleteNote } from '../controller/note-controller';

const router = new Hono();

router.use('*', authMiddleware);

router.post('/', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;