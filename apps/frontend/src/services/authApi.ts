import axios from "axios";
import type { RegisterRequestDto } from "../types/dtos/requests/RegisterRequestDto";
import type { LoginRequestDto } from "../types/dtos/requests/LoginRequestDto";
import type { LoginResponseDto } from "../types/dtos/LoginResponseDto";

const apiUrl = import.meta.env.VITE_API_URL

export async function login({identifier, password}: LoginRequestDto): Promise<LoginResponseDto>{
    const response = await axios.post<LoginResponseDto>(`${apiUrl}/auth/login`, {
        identifier,
        password
    })
    return response.data
}

export async function register( details: RegisterRequestDto ): Promise<LoginResponseDto>{
    const response = await axios.post<LoginResponseDto>(`${apiUrl}/auth/login`, details)
    return response.data
}

export async function fetchUser(){
    const response = await axios.get(`${apiUrl}/users/me`)
    return response.data
}
