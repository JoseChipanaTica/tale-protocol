'use client'

import { useState } from 'react'

const ChatInputSection = ({ onData }: { onData: any }) => {
  const [childData, setChildData] = useState('')

  const handleInputChange = (event: any) => {
    setChildData(event.target.value)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && childData.trim()) {
      event.preventDefault()
      onData(childData)
      setChildData('')
    }
  }

  return (
    <>
      <form className="">
        <div className="">
          <div className="py-4">
            <div className="border border-gray-700/10 rounded-lg cursor-text bg-white w-full flex flex-row justify-between">
              <div className="items-center inline-flex h-14 w-full">
                <textarea
                  className="w-full resize-none bg-none h-6 px-4 focus:outline-none text-gray-900"
                  placeholder="Write your message"
                  value={childData}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                ></textarea>
              </div>
              <div className="items-center inline-flex align-middle">
                <button
                  type="button"
                  className="text-base-900 border border-base-900
                     bg-base-900 hover:text-white focus:ring-4 
                     focus:outline-none focus:ring-blue-300
                      font-medium rounded-lg text-sm p-2.5 text-center 
                      inline-flex items-center mr-2 align-middle "
                >
                  <svg className="w-5 h-5" fill="black" viewBox="0 0 14 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.8334 8.33366V10.0003C12.8334 13.222 10.2217 15.8337 7.00002 15.8337M1.16669 8.33366V10.0003C1.16669 13.222 3.77836 15.8337 7.00002 15.8337M7.00002 15.8337V18.3337M3.66669 18.3337H10.3334M7.00002 12.5003C5.61931 12.5003 4.50002 11.381 4.50002 10.0003V4.16699C4.50002 2.78628 5.61931 1.66699 7.00002 1.66699C8.38073 1.66699 9.50002 2.78628 9.50002 4.16699V10.0003C9.50002 11.381 8.38073 12.5003 7.00002 12.5003Z"
                      stroke="#ffffff"
                    ></path>
                  </svg>
                  <span className="sr-only">Icon description</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ChatInputSection
