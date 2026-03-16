import { useState } from "react"
import { Rnd } from "react-rnd"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { addMessage, sendMessage } from "../../app/slices/chatbotSlice"
import ChatbotInput from "./ChatbotInput"
import ChatbotMessageList from "./ChatbotMessageList"

type ChatbotWidgetProps = {

}

export default function ChatbotWidget ({}:ChatbotWidgetProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [size, setSize] = useState({width: 320, height: 420})
    const {status} = useAppSelector(state => state.chatbot)
    const [message, setMessage] = useState("")
    const dispatch = useAppDispatch()

    const submitMessage = () => {
        if (!message.trim()) return
        dispatch(addMessage(message))
        dispatch(sendMessage(message))
        setMessage("")
    }

    const toggleCollapse = () => {
        if (collapsed){
            setSize({width: 320, height: 420})
        }else{
            setSize({width: 150, height: 50})
        }
        setCollapsed(!collapsed)
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
            size={size}
            onResizeStop={(e, _, ref) => {
                e.preventDefault()
                !collapsed && setSize({width: parseInt(ref.style.width), height: parseInt(ref.style.height)})
            }}
            minWidth={100}
            minHeight={50}
            bounds={"window"}
            dragHandleClassName="chat-drag-handle"
        >
            <div className="h-full flex flex-col rounded-xl border bg-white shadow-xl">
                <div className="chat-drag-handle flex cursor-move items-center justify-between rounded-t-xl bg-slate-800 px-3 py-2 text-white">
                    <span className="text-sm font-medium">Assistant</span>
                    <button onClick={toggleCollapse} className="rounded px-2 py-1 text-xs hover:bg-slate-700 cursor-pointer">
                        {collapsed ? "Open":"Hide"}
                    </button>
                </div>
                {
                    !collapsed && (
                        <>
                            <ChatbotMessageList />
                            <ChatbotInput message={message} setMessage={setMessage} status={status} submitMessage={submitMessage}/>
                        </>
                    )
                }
            </div>
        </Rnd>
    )
}