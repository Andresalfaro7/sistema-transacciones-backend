import {Router} from 'express';
import {authRequired} from '../middlewares/validateToken.js';
import {getCards, createCard, deleteCard, getCard, updateCard} from '../controllers/cards.controller.js';
import {validateSchema} from '../middlewares/validator.middleware.js';
import {createCardSchema} from '../schemas/card.schema.js';

const router = Router();

router.get('/cards', authRequired, getCards);
router.get('/cards/:id', authRequired, getCard);
router.post('/cards', authRequired, validateSchema(createCardSchema), createCard);
router.delete('/cards/:id', authRequired, deleteCard);
router.put('/cards/:id', authRequired, validateSchema(createCardSchema), updateCard);

export default router;