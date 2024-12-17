import { z } from "zod";

export type User = z.infer<typeof UserSchema>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
}

export type LoginBody = {
  email: string;
  password: string;
}


export default User;
