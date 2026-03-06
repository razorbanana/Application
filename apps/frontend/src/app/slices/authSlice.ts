import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { login, register, fetchUser} from "../../services/authApi";
import type { LoginRequestDto } from "../../types/dtos/requests/LoginRequestDto";
import type { RegisterRequestDto } from "../../types/dtos/requests/RegisterRequestDto";
import type { UserType } from "../../types/UserType";

interface AuthState {
  user: UserType | null;
  access_token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const tokenFromStorage = localStorage.getItem("access_token");

const initialState: AuthState = {
    user: null,
    access_token: tokenFromStorage,
    status: 'idle',
    error: null,
}

export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials: LoginRequestDto, {rejectWithValue}) => {
        try {
            const data = await login(credentials)
            return data
        }catch(err: any){
            return rejectWithValue(err.response.data)
        }
    }
)

export const registerUser = createAsyncThunk(
    "user/register",
    async (details: RegisterRequestDto, {rejectWithValue}) => {
        try{
            const data = await register(details)
            return data
        }catch(err:any){
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async () => {
        try{
            const data = await fetchUser()
            return data
        }catch(err:any){
            console.error(err)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.access_token = null
            state.user = null
            localStorage.removeItem('token')
        },
        pullTokenFromStorage: (state) => {
            const token = localStorage.getItem("access_token")
            state.access_token = token ? token : null
        },
        refreshToken: () => {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.access_token = action.payload.access_token
                state.user = action.payload.user
                localStorage.setItem('access_token', action.payload.access_token)
                state.status = "succeeded"
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.access_token = action.payload.access_token
                state.user = action.payload.user
                localStorage.setItem('access_token', action.payload.access_token)
                state.status = "succeeded"
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.status = "succeeded"
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string
            })
    }
})

export const { logout, refreshToken, pullTokenFromStorage } = authSlice.actions;

export default authSlice.reducer;