import { Outlet } from "react-router";
import Navbar from "./navigationBar/Navbar";
import { AuthInitializer } from "./AuthInitializer";
import ChatbotWidget from "./chatbotWidget/ChatbotWidget";
import EventErrorHandler from "./EventErrorHandler";

export default function RootLayout(){

    return(
        <div className="app-container">
            <EventErrorHandler />
            <AuthInitializer />
            <Navbar />
            <main className="content">
                <Outlet /> 
            </main>
            <ChatbotWidget />
        </div>
    )
}