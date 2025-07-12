import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginSystem} from "../../types";
import type { AppDispatch } from "../../app/store";
import login from "./authApi";
import axios from "axios";

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token') || null
}

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthState>){
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout(state){
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    }
})

export const {setUser, logout} = authReducer.actions;

export const loginUser = ({email, password}: LoginSystem) => {
    return async (dispatch: AppDispatch) => {
        const data = await login(email, password);
        dispatch(setUser(data));
        localStorage.setItem('token', data.token)
    }
}

export const checkAuth = () => {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            const userResponse = await axios.get('http://localhost:3001/api/auth/me', {
                headers: {Authorization: `Bearer ${token}`}
            });
            dispatch(setUser({user: userResponse.data, token}));
        }
    }
}

export default authReducer.reducer;