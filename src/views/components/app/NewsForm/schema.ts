import z from 'zod';

import { Category } from '@app/enums/Category';

export const newsFormSchema = z.object({
  title: z.string().nonempty('O título da postagem é obrigatório'),
  description: z
    .string()
    .nonempty('O resumo da postagem é obrigatória')
    .min(10, 'O resumo deve ter mais de 10 caracteres'),
  content: z
    .string()
    .nonempty('O conteúdo da postagem é obrigatório')
    .min(10, 'O conteudo deve ter mais de 10 caracteres'),
  imageUrl: z.string().nonempty('O endereço da imagem é obrigatória'),
  category: z.enum(Object.values(Category), {
    error: 'A categoria é obrigatória',
  }),
});

export type NewsFormData = z.infer<typeof newsFormSchema>;
