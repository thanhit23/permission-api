import { z } from "zod";

import db from '@/database'

export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export default User;
