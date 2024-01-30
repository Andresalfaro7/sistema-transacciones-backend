import { z } from 'zod';

export const createFlowSchema = z.object({
    nameFlow: z.string({
        required_error: 'Nombre del tipo de flujo de efectivo requerido'
    })
});