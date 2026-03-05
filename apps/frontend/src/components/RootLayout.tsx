import { Outlet } from "react-router";
import Navbar from "./navigationBar/Navbar";

export default function RootLayout(){
    return(
        <div className="app-container">
            <Navbar />
            <main className="content">
                <Outlet /> 
            </main>
        </div>
    )
}