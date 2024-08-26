"use client"

import { ptBR } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { NextUIProvider } from "@nextui-org/system"
import { Toaster } from "sonner"

import { ReactQueryProvider } from "@/providers/react-query-provider"
import { ThemeProvider } from "@/providers/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider localization={ptBR} appearance={{ baseTheme: dark }}>
			<ReactQueryProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<Toaster />
					<NextUIProvider locale="pt-BR">{children}</NextUIProvider>
				</ThemeProvider>
			</ReactQueryProvider>
		</ClerkProvider>
	)
}
