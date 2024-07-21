'use client'

import { SignUp } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams()

  return (
    <div className="h-screen flex justify-center items-center">
      <SignUp
        initialValues={{
          emailAddress: searchParams.get('email') ?? '',
          firstName: searchParams.get('firstName') ?? '',
          lastName: searchParams.get('lastName') ?? '',
        }}
      />
    </div>
  )
}
