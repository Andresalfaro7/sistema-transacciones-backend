import { z } from 'zod';

export const createCardSchema = z.object({
    number: z.string({
        required_error: 'Número de tarjeta requerido'
    }),
    cardholder: z.string({
        required_error: 'Nombre del titular requerido'
    }),
    expirationDate: z.string({
        required_error: 'Fecha de expiración requerida'
    }),
    cvv: z.string({
        required_error: 'CVV requerido'
    }),
    totalAmount: z.string({
        required_error: 'Saldo total de la tarjeta requerido'
    })
});