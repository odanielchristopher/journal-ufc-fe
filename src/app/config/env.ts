import { z } from 'zod';

export const schema = z.object({
  VITE_API_URL: z
    .string("Please add 'VITE_API_URL' in your .env file")
    .nonempty("Please add 'VITE_API_URL' in your .env file"),
  VITE_DEVELOPMENT: z.coerce.boolean().optional(),
});

export type Env = z.infer<typeof schema>;

export const env = schema.parse(import.meta.env);
