'use server'

import { z } from 'zod'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { FormSchema } from '@/lib/types'
import { cookies } from 'next/headers'

export async function ActionLoginUser({
  email,
  password
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithPassword({ email, password })

  return response
}
