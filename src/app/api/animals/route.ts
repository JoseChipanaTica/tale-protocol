import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { animals } = await request.json()

  const endpoint = process.env['NEXT_PUBLIC_BACKEND_ENDPOINT']! + 'animals'

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      animal: animals,
      sessionId: 2
    })
  })

  const { story } = await response.json()

  return NextResponse.json({ story })
}
