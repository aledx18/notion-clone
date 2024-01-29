/* eslint-disable no-unused-vars */
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Loader from '@/components/Loader'
import { ActionLoginUser } from '@/lib/server-actions/auth-actions'

export default function LoginPage() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' }
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await ActionLoginUser(formData)
    if (error) {
      form.reset()
      setSubmitError(error.message)
    }
    router.replace('/dashboard')
  }

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError('')
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className='justify-center lg:w-[400px] space-y-6 flex flex-col m-auto h-screen'>
        <Link href='/' className=' w-full flex justify-left items-center'>
          <span className='font-semibold text-white text-4xl first-letter:ml-2'>
            cypress.
          </span>
        </Link>
        <FormDescription className='text-foreground/60'>
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
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
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type='submit'
          variant='shadow'
          className='w-full p-6'
          size='lg'
          disabled={isLoading}>
          {!isLoading ? 'Login' : <Loader />}
        </Button>
        <span className='self-container text-sm'>
          Dont have an account?{' '}
          <Link href='/signup' className='text-primary'>
            Sign Up
          </Link>
        </span>
      </form>
    </Form>
  )
}
