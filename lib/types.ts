import { z } from 'zod'

export const FormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z
    .string()
    .describe('Password')
    .min(2, { message: 'Password must be at least 8 characters' })
})
