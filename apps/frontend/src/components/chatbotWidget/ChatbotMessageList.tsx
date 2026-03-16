import { useAppSelector } from "../../app/store"
import ChatbotMessage from "./ChatbotMessage"
import { useEffect, useRef } from "react"

type ChatbotMessageListProps = {
}

export default function ChatbotMessageList ({}:ChatbotMessageListProps) {
    const {messages, status } = useAppSelector(state => state.chatbot)
    const bottomRef = useRef<HTMLDivElement | null>(null)
    
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages.length])

    return (
        <div className="flex-1 overflow-y-auto p-3 text-sm">
            {messages.map((m, i) => (
                <ChatbotMessage key={i} message={m} />
            ))}
            {status==="loading" && <p>Loading...</p>}
            <div ref={bottomRef}/>
        </div>
    )
}