import {configureStore} from '@reduxjs/toolkit';
import carReducer from '../features/cars/carSlice'
import authReducer from '../features/auths/authSlice'

export const store = configureStore({
    reducer: {
        car: carReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;