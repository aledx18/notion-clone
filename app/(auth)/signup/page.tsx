'use client'

import { actionSignUpUser } from '@/lib/server-actions/auth-actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { FormSchema } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { MailCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import Loader from '@/components/Loader'

const SignUpFormSchema = z
  .object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z
      .string()
      .describe('Password')
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .describe('Confirm Password')
      .min(6, { message: 'Password must be at least 6 characters' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export default function SignUpPage() {
  const [submitError, setSubmitError] = useState('')
  const [confirmation, setConfirmation] = useState(false)

  // const router = useRouter()
  const searchParams = useSearchParams()

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return ''
    return searchParams.get('error_description')
  }, [searchParams])

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
    const { error } = await actionSignUpUser({ email, password })
    if (error) {
      setSubmitError(error.message)
      form.reset()
      return
    }
    setConfirmation(true)
  }

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError('')
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full justify-center md:w-[400px] space-y-6 flex flex-col m-auto h-screen'>
        <Link href='/' className=' w-full flex justify-left items-center'>
          logo
          <span className='font-semibold text-4xl first-letter:ml-2'>
            Cypress
          </span>
        </Link>
        <FormDescription className='text-foreground/60'>
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        {!confirmation && !codeExchangeError && (
          <>
            <FormField
              disabled={isLoading}
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='email' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              variant='shadow'
              className='w-full p-6'
              disabled={isLoading}>
              {!isLoading ? 'Create Account' : <Loader />}
            </Button>
          </>
        )}
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <span className='self-container text-sm'>
          Already have an account?{' '}
          <Link href='/login' className='text-primary'>
            Login
          </Link>
        </span>
        {(confirmation || codeExchangeError) && (
          <>
            <Alert variant='shadow'>
              {!codeExchangeError && <MailCheck className='h-4 w-4' />}
              <AlertTitle>
                {codeExchangeError ? 'Invalid Link' : 'Check your email.'}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || 'An email confirmation has been sent.'}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  )
}
