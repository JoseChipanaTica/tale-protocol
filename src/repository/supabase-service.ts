import { SupabaseClient, createClient } from '@supabase/supabase-js'

const url = process.env['NEXT_PUBLIC_SUPABASE_URL']!
const key = process.env['NEXT_PUBLIC_SUPABASE_KEY']!

const SupabaseClientWithoutToken = async () => {
  return createClient(url, key)
}

export async function findNearbyAnimals({ lat, long }: { lat: number; long: number }) {
  const supabaseClient = await SupabaseClientWithoutToken()

  const { data, error } = await supabaseClient.rpc('nearby_animals', {
    lat: lat,
    long: long
  })

  const convertedData = data.map((item: any) => {
    return { ...item, position: { lat: item.lat, lng: item.lng } }
  })

  return convertedData
}

export async function getAllAnimals() {
  const supabaseClient = await SupabaseClientWithoutToken()

  const { data, error } = await supabaseClient.rpc('get_animals')

  const convertedData = data?.map((item: any) => {
    return { ...item, position: { lat: item.lat, lng: item.lng } }
  })

  return convertedData
}
