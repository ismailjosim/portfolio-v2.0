'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type LoginState = { error?: string } | undefined

const COOKIE_NAME = 'dashboard_session'
const SESSION_VALUE = 'authenticated'
const MAX_AGE = 60 * 60 * 24 * 7

// useActionState requires: (prevState, formData) => State
// The first param is the previous state — we can ignore it but it MUST be declared
export async function loginAction(
	_prevState: LoginState,
	formData: FormData,
): Promise<LoginState> {
	const email = formData.get('email')?.toString().trim()
	const password = formData.get('password')?.toString()
	const from = formData.get('from')?.toString() || '/dashboard'

	const validEmail = process.env.DASHBOARD_EMAIL
	const validPassword = process.env.DASHBOARD_PASSWORD

	if (!validEmail || !validPassword) {
		return {
			error:
				'Server is not configured. Set DASHBOARD_EMAIL and DASHBOARD_PASSWORD in .env.local.',
		}
	}

	if (email !== validEmail || password !== validPassword) {
		return { error: 'Invalid email or password.' }
	}

	const cookieStore = await cookies()
	cookieStore.set(COOKIE_NAME, SESSION_VALUE, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: MAX_AGE,
		path: '/',
	})

	redirect(from)
}

export async function logoutAction() {
	const cookieStore = await cookies()
	cookieStore.delete(COOKIE_NAME)
	redirect('/login')
}
