import type { Message } from "../../app/slices/chatbotSlice"

type ChatbotMessageProps = {
    message: Message
}

export default function ChatbotMessage ({message}:ChatbotMessageProps) {
   const isUser = message.sender == "user"
   const basicStyles = "flex w-full mb-2"

   return (
      <div className={`${basicStyles} ${ isUser ? "justify-end" : "justify-start"}`}>
         <div
            className={`max-w-[75%] rounded-xl px-3 py-2 text-sm shadow
            ${isUser
               ? "bg-blue-600 text-white rounded-br-sm"
               : "bg-gray-100 text-gray-900 rounded-bl-sm"
            }`}
         >
            {message.message}
         </div>
      </div>
   )
}