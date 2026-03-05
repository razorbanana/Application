import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL

export async function getAllEvents(){
    return await axios.get(`${apiUrl}/events`)
}