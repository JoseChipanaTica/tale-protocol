import { v4 as uuidv4 } from 'uuid'

const qdrantUrl = process.env['NEXT_PUBLIC_QDRANT_URL']!
const qdrantKey = process.env['NEXT_PUBLIC_QDRANT_URL']!
const qdrantCName = process.env['NEXT_PUBLIC_QDRANT_CNAME']!

export const findingClosestContextByEmbeddings = async (vector: number[]) => {
  const endpoint = qdrantUrl + '/collections/{collection_name}/points/search'.replace('{collection_name}', qdrantCName)

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'api-key': qdrantKey
    },
    body: JSON.stringify({
      vector,
      limit: 5,
      with_payload: true
    })
  })

  const data: Array<{ id: number; payload: { text: string } }> = await response.json()

  return data.map(it => it.payload.text)
}

export const getCollectionData = async () => {
  const endpoint = qdrantUrl + '/collections/{collection_name}'.replace('{collection_name}', qdrantCName)

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'api-key': qdrantKey
    }
  })

  const data = await response.json()

  return data
}

export const createCollectionData = async () => {
  const endpoint = qdrantUrl + '/collections/{collection_name}'.replace('{collection_name}', qdrantCName)

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'api-key': qdrantKey
    },
    body: JSON.stringify({
      vectors: {
        size: 4096,
        distance: 'Cosine'
      }
    })
  })

  const data = await response.json()

  return data
}

export const insertCollectionPoint = async (vector: [], text: string) => {
  const endpoint = qdrantUrl + '/collections/{collection_name}/points'.replace('{collection_name}', qdrantCName)

  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'api-key': qdrantKey
    },
    body: JSON.stringify({
      batch: {
        ids: [uuidv4()],
        vectors: [vector],
        payload: [{ text }]
      }
    })
  })

  const data = await response.json()

  return data
}
