import * as v from 'valibot'

// Login schema
export const LoginSchema = v.object({
	email: v.pipe(
		v.string('Email is required'),
		v.nonEmpty('Email cannot be empty'),
		v.email('Please enter a valid email address')
	),
	password: v.pipe(
		v.string('Password is required'),
		v.nonEmpty('Password cannot be empty'),
		v.minLength(8, 'Password must be at least 8 characters')
	),
})

export type LoginInput = v.InferInput<typeof LoginSchema>
export type LoginOutput = v.InferOutput<typeof LoginSchema>

// Register schema
export const RegisterSchema = v.pipe(
	v.object({
		email: v.pipe(
			v.string('Email is required'),
			v.nonEmpty('Email cannot be empty'),
			v.email('Please enter a valid email address')
		),
		password: v.pipe(
			v.string('Password is required'),
			v.nonEmpty('Password cannot be empty'),
			v.minLength(8, 'Password must be at least 8 characters')
		),
		passwordConfirm: v.pipe(v.string('Please confirm your password'), v.nonEmpty('Password confirmation is required')),
		name: v.optional(v.string()),
	}),
	v.forward(
		v.partialCheck(
			[['password'], ['passwordConfirm']],
			input => input.password === input.passwordConfirm,
			'Passwords do not match'
		),
		['passwordConfirm']
	)
)

export type RegisterInput = v.InferInput<typeof RegisterSchema>
export type RegisterOutput = v.InferOutput<typeof RegisterSchema>

// Password reset request schema
export const PasswordResetRequestSchema = v.object({
	email: v.pipe(
		v.string('Email is required'),
		v.nonEmpty('Email cannot be empty'),
		v.email('Please enter a valid email address')
	),
})

export type PasswordResetRequestInput = v.InferInput<typeof PasswordResetRequestSchema>
export type PasswordResetRequestOutput = v.InferOutput<typeof PasswordResetRequestSchema>

// Password reset schema
export const PasswordResetSchema = v.pipe(
	v.object({
		password: v.pipe(
			v.string('Password is required'),
			v.nonEmpty('Password cannot be empty'),
			v.minLength(8, 'Password must be at least 8 characters')
		),
		passwordConfirm: v.pipe(v.string('Please confirm your password'), v.nonEmpty('Password confirmation is required')),
	}),
	v.forward(
		v.partialCheck(
			[['password'], ['passwordConfirm']],
			input => input.password === input.passwordConfirm,
			'Passwords do not match'
		),
		['passwordConfirm']
	)
)

export type PasswordResetInput = v.InferInput<typeof PasswordResetSchema>
export type PasswordResetOutput = v.InferOutput<typeof PasswordResetSchema>
