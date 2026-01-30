'use client'

import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { LoginSchema, type LoginInput } from '@/lib/validations/auth'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

export function LoginForm() {
	const { login } = useAuth()
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		} as LoginInput,
		onSubmit: async ({ value }) => {
			setError(null)
			setIsLoading(true)
			try {
				await login(value.email, value.password)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Login failed')
			} finally {
				setIsLoading(false)
			}
		},
		validatorAdapter: valibotValidator(),
	})

	return (
		<div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-sm">
			<div className="space-y-2 text-center">
				<h1 className="text-2xl font-bold">Sign In</h1>
				<p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
			</div>

			<form
				onSubmit={e => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
				className="space-y-4"
			>
				<form.Field
					name="email"
					validators={{
						onChange: LoginSchema.entries.email,
					}}
				>
					{field => (
						<div className="space-y-2">
							<label htmlFor={field.name} className="text-sm font-medium">
								Email
							</label>
							<input
								id={field.name}
								name={field.name}
								type="email"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={e => field.handleChange(e.target.value)}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								placeholder="you@example.com"
							/>
							{field.state.meta.errors.length > 0 && (
								<p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
							)}
						</div>
					)}
				</form.Field>

				<form.Field
					name="password"
					validators={{
						onChange: LoginSchema.entries.password,
					}}
				>
					{field => (
						<div className="space-y-2">
							<label htmlFor={field.name} className="text-sm font-medium">
								Password
							</label>
							<input
								id={field.name}
								name={field.name}
								type="password"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={e => field.handleChange(e.target.value)}
								className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
								placeholder="••••••••"
							/>
							{field.state.meta.errors.length > 0 && (
								<p className="text-sm text-destructive">{field.state.meta.errors[0]}</p>
							)}
						</div>
					)}
				</form.Field>

				{error && (
					<div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
						{error}
					</div>
				)}

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? 'Signing in...' : 'Sign In'}
				</Button>
			</form>
		</div>
	)
}
