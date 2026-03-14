import { useState } from "react"
import { Rnd } from "react-rnd"
import { useAppDispatch, useAppSelector } from "../../app/store"
import ChatbotMessage from "./ChatbotMessage"
import { sendMessage } from "../../app/slices/chatbotSlice"
import ChatbotInput from "./ChatbotInput"

type ChatbotWidgetProps = {

}

export default function ChatbotWidget ({}:ChatbotWidgetProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const {messages, status, error} = useAppSelector(state => state.chatbot)
    const [message, setMessage] = useState("")
    const dispatch = useAppDispatch()

    const submitMessage = () => {
        if (!message.trim()) return
        dispatch(sendMessage(message))
    }

    return (
        <Rnd 
            default={
                {
                    x: window.innerWidth - 360,
                    y: window.innerHeight - 500,
                    width: 320,
                    height: 420
                }
            }
            minWidth={280}
            minHeight={120}
            bounds={"window"}
            dragHandleClassName="chat-drag-handle"
        >
            <div className="h-full flex flex-col rounded-xl border bg-white shadow-xl">
                <div className="chat-drag-handle flex cursor-move items-center justify-between rounded-t-xl bg-slate-800 px-3 py-2 text-white">
                    <span className="text-sm font-medium">Assistant</span>
                    <button onClick={() => setCollapsed(!collapsed)} className="rounded px-2 py-1 text-xs hover:bg-slate-700">
                        {collapsed ? "Open":"Hide"}
                    </button>
                </div>
                {
                    !collapsed && (
                        <>
                            <div className="flex-1 overflow-y-auto p-3 text-sm">
                                {messages.map((m, i) => (
                                    <ChatbotMessage key={i} message={m} />
                                ))}
                            </div>
                            <ChatbotInput message={message} setMessage={setMessage} status={status} submitMessage={submitMessage}/>
                        </>
                    )
                }
            </div>
        </Rnd>
    )
}