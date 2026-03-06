import { Outlet } from "react-router";
import Navbar from "./navigationBar/Navbar";
import { AuthInitializer } from "./AuthInitializer";



export default function RootLayout(){
    return(
        <div className="app-container">
            <AuthInitializer />
            <Navbar />
            <main className="content">
                <Outlet /> 
            </main>
        </div>
    )
}