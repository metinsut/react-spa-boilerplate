import zod, { z } from 'zod';

export const schema = zod.object({
  password: zod.string().min(6),
  email: zod.string().email()
});

export type TRegister = z.infer<typeof schema>;
