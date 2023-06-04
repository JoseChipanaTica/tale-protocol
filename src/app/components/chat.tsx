'use client'

import { useEffect, useState } from 'react'
import LoadingSpinner from './loading-spinner'
import ChatInputSection from './chat-inputs'
import ChatMessageSection from './chat-message'

const ChatSection = ({
  animal,
  animals,
  sessionId,
  setNearbyAnimals,
  setSelectedAnimal
}: {
  animal: any
  animals: Array<any>
  sessionId: string
  setNearbyAnimals: any
  setSelectedAnimal: any
}) => {
  const messageList = [
    {
      text: "Hi! I am your guide. Let's go find something new about Upemba. You are the star, you are the ranger!",
      rol: 'system'
    }
  ]
  const [messages, setMessages] = useState<Array<any>>(messageList)
  const [isLoading, setIsLoading] = useState(false)

  const handleChildData = async (message: any) => {
    setIsLoading(true)
    setMessages(prev => [...prev, { text: message, rol: 'user' }])

    const answer = await questionAboutTale(message)

    setMessages(prev => [...prev, { text: answer, rol: 'system' }])
    setIsLoading(false)

    setIsLoading(false)
  }

  const writeStoryAboutAnimal = async () => {
    setIsLoading(true)

    const response = await fetch(process.env['NEXT_PUBLIC_BACKEND_ENDPOINT']!, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        animal: animal,
        sessionId: sessionId
      })
    })

    const { story } = await response.json()

    setMessages(prev => [...prev, { text: story, rol: 'system' }])

    setSelectedAnimal('')
    setIsLoading(false)
  }

  const writeStoryAboutAnimals = async () => {
    setIsLoading(true)
    const endpoint = process.env['NEXT_PUBLIC_BACKEND_ENDPOINT']! + 'animals'

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        animals: JSON.stringify(animals),
        sessionId: sessionId
      })
    })

    const { story } = await response.json()

    setMessages(prev => [...prev, { text: story, rol: 'system' }])

    setNearbyAnimals([])
    setIsLoading(false)
  }

  const questionAboutTale = async (question: string) => {
    setIsLoading(true)
    const endpoint = process.env['NEXT_PUBLIC_BACKEND_ENDPOINT']! + 'question'

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question,
        sessionId: sessionId
      })
    })

    const { story } = await response.json()

    return story
  }

  useEffect(() => {
    if (animal) {
      writeStoryAboutAnimal()
    }

    if (animals.length > 0) {
      writeStoryAboutAnimals()
    }
  }, [animal, animals])

  return (
    <div className="p-5 bg-white h-screen">
      <div className="">
        <div className="flex justify-end"></div>
      </div>

      <div className="">
        <div className="">
          <ChatMessageSection messages={messages} />
          <>{isLoading ? <LoadingSpinner /> : <></>}</>
        </div>

        <div>
          <ChatInputSection onData={handleChildData} />
        </div>
      </div>

      <div className="">
        <div className="flex justify-center text-gray-400 text-base">
          <p>Powered By Tale Protocol</p>
        </div>
      </div>
    </div>
  )
}

export default ChatSection
