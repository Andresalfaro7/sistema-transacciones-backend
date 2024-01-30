import {Router} from 'express';
import {authRequired} from '../middlewares/validateToken.js';
import {createTransaction, getTransaction, getTransactions, updateTransaction, deleteTransaction} from '../controllers/transactions.controller.js';
import {validateSchema} from '../middlewares/validator.middleware.js';
import {createTransactionSchema} from '../schemas/transaction.schema.js';

const router = Router();

router.get('/transactions', authRequired, getTransactions);
router.get('/transactions/:id', authRequired, getTransaction);
router.post('/transactions', authRequired, validateSchema(createTransactionSchema), createTransaction);
router.delete('/transactions/:id', authRequired, deleteTransaction);
router.put('/transactions/:id', authRequired, validateSchema(createTransactionSchema), updateTransaction);

export default router;