import {Router} from 'express';
import {authRequired} from '../middlewares/validateToken.js';
import {createFlow, deleteFlow, getFlow, getFlows, updateFlow} from '../controllers/flows.controller.js';
import {validateSchema} from '../middlewares/validator.middleware.js';
import {createFlowSchema} from '../schemas/flow.schema.js';

const router = Router();

router.get('/flows', authRequired, getFlows);
router.get('/flows/:id', authRequired, getFlow);
router.post('/flows', authRequired, validateSchema(createFlowSchema), createFlow);
router.delete('/flows/:id', authRequired, deleteFlow);
router.put('/flows/:id', authRequired, validateSchema(createFlowSchema), updateFlow);

export default router;