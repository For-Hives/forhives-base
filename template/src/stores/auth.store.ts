import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { pb } from '@/services/pocketbase.client'
import type { AuthModel } from 'pocketbase'

interface AuthState {
	user: AuthModel | null
	token: string | null
	isAuthenticated: boolean
	login: (email: string, pass: string) => Promise<void>
	logout: () => void
	checkAuth: () => boolean
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			isAuthenticated: false,

			login: async (email, pass) => {
				const authData = await pb.collection('users').authWithPassword(email, pass)
				set({ 
					user: authData.record, 
					token: authData.token, 
					isAuthenticated: true 
				})
				// Sync cookie if needed or rely on client-side token
				document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
			},

			logout: () => {
				pb.authStore.clear()
				document.cookie = pb.authStore.exportToCookie({ httpOnly: false, expires: new Date(0) })
				set({ user: null, token: null, isAuthenticated: false })
			},

			checkAuth: () => {
				const isValid = pb.authStore.isValid
				set({ isAuthenticated: isValid, user: pb.authStore.model })
				return isValid
			}
		}),
		{
			name: 'auth-storage',
			skipHydration: true, // Handle hydration manually if needed or let persist handle it
		}
	)
)
