import { useAppSelector } from "../../app/store";
import { NavItem } from "./NavItem";
import { List, Calendar, Plus, LogOut, User } from "lucide-react";
export default function Navbar(){

  const user = useAppSelector(state => state.auth.user)

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

        <NavItem to="/my/profile" icon={<User />} label={user || "log in"}/>
        <NavItem to="/" variant="red" icon={<LogOut />} beforeNavigate={logout}/>
      </div>
    </nav>
  );
};