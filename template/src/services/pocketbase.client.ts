import PocketBase from 'pocketbase'

// Use environment variable or default to localhost
const PB_URL = process.env.NEXT_PUBLIC_PB_URL || 'http://127.0.0.1:8090'

// Singleton instance for client-side usage
export const pb = new PocketBase(PB_URL)
pb.autoCancellation(false)
