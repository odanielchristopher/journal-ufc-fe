import z from 'zod';

import { Role } from '@app/enums/Role';

export const userSchema = z.object({
  nickname: z.string().nonempty('O nome do usuário é obrigatório'),
  username: z.email('O e-mail do usuário deve ser válido'),
  role: z.enum(Object.values(Role), {
    error: 'O perfil do usuário é obrigatório',
  }),
});

export type UsersFormData = z.infer<typeof userSchema>;
