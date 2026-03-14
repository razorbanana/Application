type ChatbotInputProps = {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    submitMessage: () => void
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

export default function ChatbotInput ({message, setMessage, submitMessage, status}:ChatbotInputProps) {
   return (
      <div className="border-t p-2 flex gap-2">
        <input
            disabled={status === "loading"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim()) {
                submitMessage()
            }
            }}
            placeholder="Ask something..."
            className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
        />

        <button
            disabled={status === "loading" || !message.trim()}
            onClick={() => {
            submitMessage()
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
            Send
        </button>
        </div>
   )
}