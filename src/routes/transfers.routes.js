import {Router} from 'express';
import {authRequired} from '../middlewares/validateToken.js';
import {createTransfer, deleteTransfer, getTransfer, getTransfers, updateTransfer} from '../controllers/transfers.controller.js';
import {validateSchema} from '../middlewares/validator.middleware.js';
import {createTransactionSchema} from '../schemas/transfer.schema.js';

const router = Router();

router.get('/transfers', authRequired, getTransfers);
router.get('/transfers/:id', authRequired, getTransfer);
router.post('/transfers', authRequired, validateSchema(createTransactionSchema), createTransfer);
router.delete('/transfers/:id', authRequired, deleteTransfer);
router.put('/transfers/:id', authRequired, validateSchema(createTransactionSchema), updateTransfer);

export default router;