import { ChatAnthropic } from 'langchain/chat_models/anthropic'
import { BufferMemory } from 'langchain/memory'
import { v4 as uuidv4 } from 'uuid'
import { ConversationChain } from 'langchain/chains'

export const chatModel = (temperature: number, sessionId: string = uuidv4()) => {
  const memory = new BufferMemory()

  const model = new ChatAnthropic({
    temperature,
    anthropicApiKey: process.env['NEXT_PUBLIC_ANTHROPIC_KEY']
  })

  const chain = new ConversationChain({ llm: model, memory })
  return { chain, history }
}

export const newQuery = async (prompt: string, temperature: number = 0.9, sessionId: string | undefined) => {
  // const context = await generateContext(prompt)

  const messageInput = 'Write a story about: {prompt}'
    // .replace('{context}', context)
    .replace('{prompt}', prompt)

  const { chain } = chatModel(temperature, sessionId)
  const { text } = await chain.call({ input: messageInput })
  debugger
  return text
}
