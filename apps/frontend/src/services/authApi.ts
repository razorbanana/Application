import type { RegisterRequestDto } from "../types/dtos/requests/RegisterRequestDto";
import type { LoginRequestDto } from "../types/dtos/requests/LoginRequestDto";
import type { LoginResponseDto } from "../types/dtos/LoginResponseDto";
import api from "./api";


export async function login({identifier, password}: LoginRequestDto): Promise<LoginResponseDto>{
    const response = await api.post<LoginResponseDto>(`/auth/login`, {
        identifier,
        password
    })
    return response.data
}

export async function register( details: RegisterRequestDto ): Promise<LoginResponseDto>{
    const response = await api.post<LoginResponseDto>(`/auth/register`, details)
    return response.data
}

export async function fetchUser(){
    const response = await api.get(`/users/me`)
    return response.data
}
