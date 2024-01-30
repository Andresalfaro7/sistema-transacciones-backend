import {z} from 'zod';

export const registerSchema = z.object({
    names: z.string({
        required_error: 'Nombres son requeridos'
    }),
    lastnames: z.string({
        required_error: 'Apellidos son requeridos'
    }),
    email: z.string({
        required_error: 'Correo electrónico es requerido'
    }).email({
        message: 'Correo electrónico invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Correo electrónico es requerido'
    }).email({
        message: 'Correo electrónico invalido'
    }),
    password: z.string({
        required_error: 'Contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
})