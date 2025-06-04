import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { createPocket, getPockets, updatePocket, deletePocket } from '../controller/pocket-controller';
import { createCard, getCards, updateCard, deleteCard } from '../controller/card-controller';

const router = new Hono();

router.use('*', authMiddleware);

router.post('/', createPocket);
router.get('/', getPockets);
router.put('/:id', updatePocket);
router.delete('/:id', deletePocket);

router.post('/:id/cards', createCard);
router.get('/:id/cards', getCards);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

export default router;