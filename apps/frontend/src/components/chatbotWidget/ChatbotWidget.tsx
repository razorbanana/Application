import { useState } from "react"
import { Rnd } from "react-rnd"

type ChatbotWidgetProps = {

}

export default function ChatbotWidget ({}:ChatbotWidgetProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false)

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
                                {/* Bit messages */}
                            </div>
                            <div className="border-t p-2">
                                <input placeholder="Ask something..." className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"/>
                            </div>
                        </>
                    )
                }
            </div>
        </Rnd>
    )
}