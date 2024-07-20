'use client'

import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Toaster } from 'sonner'

import { ThemeProvider } from '@/providers/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR} appearance={{ baseTheme: dark }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </ThemeProvider>
    </ClerkProvider>
  )
}
