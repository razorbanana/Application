import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyEventsPage from "../pages/myPages/MyEventsPage";
import CreateEventPage from "../pages/CreateEventPage";
import RootLayout from "../components/RootLayout";
import ProfilePage from "../pages/myPages/ProfilePage";
import EventPage from "../pages/EventPage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
    { 
        path: "/", 
        Component: RootLayout,
        children: [
            {index: true, Component: HomePage},
            {path: "login", Component: LoginPage},
            {path: "my", children: [
                {path: "events", Component: () => <ProtectedRoute Component={MyEventsPage}/>},
                {path: "profile", Component: () => <ProtectedRoute Component={ProfilePage}/>},
            ]},
            {path: "event", Component: EventPage},
            {path: "create", Component: () => <ProtectedRoute Component={CreateEventPage}/>},
        ]
    },
]);