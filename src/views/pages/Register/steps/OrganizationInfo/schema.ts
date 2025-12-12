import z from 'zod';

export const organizationSchema = z.object({
  avatar: z.instanceof(File).optional(),
  name: z
    .string()
    .nonempty({ message: 'Nome da organização é obrigatória' })
    .max(40, 'Máximo 40 caracteres'),
});
