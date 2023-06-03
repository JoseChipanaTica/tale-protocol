import SystemChatInput from '@/app/components/system-chat-input'
import UserChatInput from '@/app/components/user-chat-input'
import { useEffect, useRef } from 'react'

const ChatMessageSection = ({ messages }: { messages: Array<any> }) => {
  const chatContainerRef = useRef(null)
  useEffect(() => {
    if (chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current['scrollTop'] = chatContainerRef.current['scrollHeight']
    }
  }, [messages])

  return (
    <>
      <div className="overflow-auto h-[80vh]" ref={chatContainerRef}>
        <div
          id="messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto 
          scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter
           scrollbar-w-2 scrolling-touch"
        >
          {messages?.map((it, i) => (
            <div key={i}>
              {it.rol === 'system' ? <SystemChatInput message={it} /> : <></>}
              {it.rol === 'user' ? <UserChatInput message={it} /> : <></>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ChatMessageSection
