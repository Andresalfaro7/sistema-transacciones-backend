import { z } from 'zod';

export const createTransactionSchema = z.object({
    concept: z.string({
        required_error: 'Concepto de transferencia requerido'
    }),
    amount: z.string({
        required_error: 'Monto de la transferencia requerido'
    }),
    flow: z.string({
        required_error: 'Tipo de flujo de efectivo requerido'
    }),
    card: z.string({
        required_error: 'Tarjeta requerida'
    })
});