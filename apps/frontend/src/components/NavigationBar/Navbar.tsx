import { NavItem } from "./NavItem";
import { List, Calendar, Plus, LogOut } from "lucide-react";
export default function Navbar(){

  function logout () {
    alert("You are logging out")
  }

  return (
    <nav className="flex justify-between px-8 py-4 bg-white shadow-md border-b border-gray-200">
      <div className="flex gap-6 items-center"></div>
      <div className="flex gap-6 items-center">
        <NavItem to="/" label="Events" icon={<List />}/>
        <NavItem to="/my/events" label="My Events" icon={<Calendar />}/>
        <NavItem to="/create" label="Create Event" variant="blue" icon={<Plus />}/>

        <div className="h-8 w-px bg-gray-300" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">AM</div>
          <span className="text-sm font-semibold text-gray-800">alice_m</span>
        </div>
        <NavItem to="/" variant="red" icon={<LogOut />} beforeNavigate={logout}/>
      </div>
    </nav>
  );
};