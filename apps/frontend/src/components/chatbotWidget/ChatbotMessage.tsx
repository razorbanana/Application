type ChatbotMessageProps = {
    message: string
}
export default function ChatbotMessage ({message}:ChatbotMessageProps) {
   return (
      <div>
        {message}
      </div>
   )
}