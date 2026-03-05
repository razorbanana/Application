import type { ReactNode } from "react";
import { NavLink } from "react-router";

type NavItemProps = {
    to: string;
    label?: string;
    variant?: "nav" | "red" | "blue",
    icon?: ReactNode,
    beforeNavigate?: () => void
}

export function NavItem ({to, label, variant = "nav", icon, beforeNavigate}: NavItemProps){
    const baseClasses = "transition-colors duration-200 flex items-center gap-2 font-medium";
    const styles = {
        nav: "text-gray-700 hover:text-blue-600",
        red: "px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm",
        blue: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-300 text-sm"
    }

    return (
        <NavLink 
            to={to}
            onClick={beforeNavigate}
            className={({isActive})=>`${baseClasses} ${styles[variant]} ${isActive && variant == "nav" ? "text-blue-600 pb-2 border-b-2 border-blue-600" : ""}`}
        >
            {icon}
            {label}
        </NavLink>
    )
}