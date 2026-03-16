import { useEffect, useState } from "react"
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
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [position, setPosition] = useState({ x: window.innerWidth - 50, y: window.innerHeight - 100 })
    const {status} = useAppSelector(state => state.chatbot)
    const [message, setMessage] = useState("")
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleResize = () => setWindowSize({width: window.innerWidth, height: window.innerHeight})
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const adjustPosition = (adjustedPosition: {x: number, y: number}) => {
        const maxX = windowSize.width - size.width - 30
        const maxY = windowSize.height - size.height - 30
        setPosition({
            x: Math.min(adjustedPosition.x, maxX),
            y: Math.min(adjustedPosition.y, maxY)
        })
    }

    useEffect(() => {
        adjustPosition(position)
    }, [windowSize, size])

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
                    x: position.x,
                    y: position.y,
                    width: size.width,
                    height: size.height
                }
            }
            size={size}
            position={position}
            onDragStop={(_, d) => adjustPosition({ x: d.x, y: d.y })}
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