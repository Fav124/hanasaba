import { handlers } from '@/lib/auth'

// Handle case where handlers might be undefined during build
const handlerGET = handlers?.GET
const handlerPOST = handlers?.POST

export async function GET(req: Request) {
  if (handlerGET) {
    return handlerGET(req)
  }
  return new Response('Auth not configured', { status: 503 })
}

export async function POST(req: Request) {
  if (handlerPOST) {
    return handlerPOST(req)
  }
  return new Response('Auth not configured', { status: 503 })
}