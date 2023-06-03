const UserChatInput = ({ message }: { message: any }) => {
  return (
    <>
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 text-base rounded-lg inline-block rounded-br-none bg-base-900 bg-gray-300 text-gray-600 ">
                {message.text}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            className="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
    </>
  )
}

export default UserChatInput
