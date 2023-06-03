import { ChatAnthropic } from 'langchain/chat_models/anthropic'
import { HumanChatMessage } from 'langchain/schema'
import { text2Embeddings } from './text-service'
import { findingClosestContextByEmbeddings } from './qdrant-service'

export const generateSynthesizeContext = async (context: string[]) => {
  const model = new ChatAnthropic({
    temperature: 0.5,
    apiKey: process.env['NEXT_PUBLIC_ANTHROPIC_KEY']
  })

  const messages = [
    new HumanChatMessage('Generate a summary information based on the next context:'),
    ...context.map(it => new HumanChatMessage(it))
  ]

  const response = await model.call(messages)

  return response.text
}

export const generateContext = async (query: string) => {
  const embed = await text2Embeddings(query)
  const closests = await findingClosestContextByEmbeddings(embed)
  const context = await generateSynthesizeContext(closests)

  return context
}
