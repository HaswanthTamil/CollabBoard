import { Hono } from 'hono';
import { authMiddleware, jwtMiddleware } from '../middleware/authentication';
import { createPocket, deletePocket, getPockets, updatePocket } from '../controllers/pocket';
import { createCard, getCards, updateCard, deleteCard } from '../controllers/card';

const router = new Hono();

router.use('*', jwtMiddleware, authMiddleware);

router.post('/', createPocket);
router.get('/', getPockets);
router.put('/:id', updatePocket);
router.delete('/:id', deletePocket);

router.post('/:id/cards', createCard);
router.get('/:id/cards', getCards);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;