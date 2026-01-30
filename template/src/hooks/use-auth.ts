'use client'

import { useAuthStore } from '@/stores/auth.store'
import { useEffect } from 'react'

export function useAuth() {
	const { user, isAuthenticated, login, logout, checkAuth } = useAuthStore()

	useEffect(() => {
		// Check auth on mount
		checkAuth()
	}, [checkAuth])

	return {
		user,
		isAuthenticated,
		login,
		logout,
		checkAuth,
	}
}
