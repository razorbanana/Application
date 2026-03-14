import { Outlet } from "react-router";
import Navbar from "./navigationBar/Navbar";
import { AuthInitializer } from "./AuthInitializer";
import ChatbotWidget from "./chatbotWidget/chatbotWidget";



export default function RootLayout(){
    return(
        <div className="app-container">
            <AuthInitializer />
            <Navbar />
            <main className="content">
                <Outlet /> 
            </main>
            <ChatbotWidget />
        </div>
    )
}