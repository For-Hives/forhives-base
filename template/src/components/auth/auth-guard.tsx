'use client'

import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

interface AuthGuardProps {
	children: ReactNode
	fallback?: ReactNode
	redirectTo?: string
}

export function AuthGuard({ children, fallback, redirectTo = '/login' }: AuthGuardProps) {
	const { isAuthenticated, checkAuth } = useAuth()
	const router = useRouter()

	useEffect(() => {
		const isValid = checkAuth()
		if (!isValid && redirectTo) {
			router.push(redirectTo)
		}
	}, [checkAuth, redirectTo, router])

	if (!isAuthenticated) {
		return fallback || null
	}

	return <>{children}</>
}
