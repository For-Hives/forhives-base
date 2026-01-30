import { cookies } from 'next/headers'
import PocketBase from 'pocketbase'

export async function createServerClient() {
	const cookieStore = await cookies()
	const pb = new PocketBase(process.env.PB_URL || 'http://127.0.0.1:8090')

	// Load the auth store from the cookie
	pb.authStore.save(cookieStore.get('pb_auth')?.value || '', null)

	return pb
}
