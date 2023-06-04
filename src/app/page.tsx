'use client'

import { v4 as uuidv4 } from 'uuid'

import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api'
import { useEffect, useMemo, useState } from 'react'
import { findNearbyAnimals, getAllAnimals } from '@/repository/supabase-service'
import ChatSection from './components/chat'

const MapPage = () => {
  const libraries = useMemo(() => ['places'], [])
  const mapCenter = useMemo(() => ({ lat: -8.937216, lng: 26.517988 }), [])
  const [session] = useState<string>(uuidv4())

  const [lat, setLat] = useState(-8.937216)
  const [lng, setLng] = useState(26.517988)

  const [animals, setAnimals] = useState<Array<any>>([])

  const [nearbyAnimals, setNearbyAnimals] = useState([])
  const [selectedAnimal, setSelectedAnimal] = useState('')

  const writeStoryAboutAnimal = (animal: any) => {
    setSelectedAnimal(animal)
  }

  const getAnimals = async () => {
    const data = await getAllAnimals()
    if (data) {
      setAnimals(data)
    }
  }

  const userMarkerNewPosition = async (e: any) => {
    setLat(e.latLng.lat())
    setLng(e.latLng.lng())
    const data = await findNearbyAnimals({ lat: e.latLng.lat(), long: e.latLng.lng() })
    setNearbyAnimals(data)
  }

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true
    }),
    []
  )

  useEffect(() => {
    getAnimals()
  }, [setAnimals])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any
  })

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <div className="">
      <div className="flex flex-col md:flex-row h-screen justify-between">
        <div className="basis-3/5">
          <GoogleMap
            options={mapOptions}
            zoom={10}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.SATELLITE}
            mapContainerStyle={{ height: '100vh' }}
            onLoad={() => console.log('Map Component Loaded...')}
          >
            {animals.map((it, i) => (
              <MarkerF key={i} position={it.position} icon={it.icon} onClick={() => writeStoryAboutAnimal(it.name)} />
            ))}

            <MarkerF
              position={{ lat, lng }}
              icon={'https://tale-protocol.vercel.app/icons/Rangerbg.png'}
              draggable={true}
              onDragEnd={e => userMarkerNewPosition(e)}
            />
          </GoogleMap>
        </div>

        <div className="basis-2/4">
          <ChatSection
            animal={selectedAnimal}
            animals={nearbyAnimals}
            sessionId={session}
            setNearbyAnimals={setNearbyAnimals}
            setSelectedAnimal={setSelectedAnimal}
          />
        </div>
      </div>
    </div>
  )
}

export default MapPage
