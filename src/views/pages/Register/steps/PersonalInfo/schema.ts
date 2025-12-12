import z from 'zod';

export const personalSchema = z.object({
  avatar: z.instanceof(File).optional(),
  firstName: z
    .string()
    .nonempty({ message: 'Nome do usuário é obrigatório' })
    .max(20, 'Máximo 20 caracteres'),
  lastName: z
    .string()
    .nonempty({ message: 'Sobrenome do usuário é obrigatório' })
    .max(20, 'Máximo 20 caracteres'),
  age: z.coerce
    .number()
    .min(18, 'Idade do usuário deve ser, no mínimo, 18 anos'),
});
