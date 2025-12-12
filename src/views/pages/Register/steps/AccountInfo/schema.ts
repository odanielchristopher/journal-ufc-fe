import z from 'zod';

export const accountInfoSchema = z
  .object({
    email: z
      .string()
      .nonempty('O e-mail é obrigatório')
      .email('O e-mail deve ser válido'),
    confirmEmail: z
      .string()
      .nonempty('Confirme o seu e-mail')
      .email('O e-mail deve ser válido'),
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().nonempty('Confirme a sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })
  .refine((data) => data.email === data.confirmEmail, {
    path: ['confirmEmail'],
    message: 'Os e-mails não coincidem',
  });
