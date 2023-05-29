export const text2Embeddings = async (query: string): Promise<number[]> => {
  const cohereKey = process.env['NEXT_PUBLIC_COHERE_KEY']
  const response = await fetch('https://api.cohere.ai/v1/embed', {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer ' + cohereKey
    },
    body: JSON.stringify({
      text: [query]
    })
  })

  const data = await response.json()

  return data.embeddings[0]
}
