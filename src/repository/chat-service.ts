import { ChatAnthropic } from 'langchain/chat_models/anthropic'
import { RedisChatMessageHistory } from 'langchain/stores/message/redis'
import { BufferMemory } from 'langchain/memory'
import { v4 as uuidv4 } from 'uuid'
import { ConversationChain } from 'langchain/chains'
import { AIChatMessage, HumanChatMessage } from 'langchain/dist/schema'

export const chatModel = (temperature: number, sessionId: string = uuidv4()) => {
  const history = new RedisChatMessageHistory({
    sessionId: sessionId,
    sessionTTL: 300,
    config: {
      url: process.env['NEXT_PUBLIC_REDIS_URL']
    }
  })
  const memory = new BufferMemory({
    chatHistory: history
  })

  const model = new ChatAnthropic({
    temperature,
    apiKey: process.env['NEXT_PUBLIC_ANTHROPIC_KEY']
  })

  const chain = new ConversationChain({ llm: model, memory })
  return { chain, history }
}

export const newQuery = async (prompt: string, temperature: number = 0.9, sessionId: string) => {
  const { chain, history } = chatModel(temperature, sessionId)
  const { text } = await chain.call({ input: prompt })

  history.addMessage(new HumanChatMessage(prompt))
  history.addMessage(new AIChatMessage(text))

  return text
}
