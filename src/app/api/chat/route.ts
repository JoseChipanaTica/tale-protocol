import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { animal } = await request.json()

  const response = await fetch(process.env['NEXT_PUBLIC_BACKEND_ENDPOINT']!, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      animal: animal,
      sessionId: 2
    })
  })

  const { story } = await response.json()

  return NextResponse.json({ story })
}
