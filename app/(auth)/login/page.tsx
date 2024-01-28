/* eslint-disable no-unused-vars */
'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [submitError, setSubmitError] = useState('')
  return <h1>Login</h1>
}
