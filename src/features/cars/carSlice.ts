import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CarType } from "../../types";
import { fetchCarsAPI } from "./carApi";
import type { AppDispatch } from "../../app/store";

const initialState: CarType[] = [];

const carReducer = createSlice({
    name: 'car',
    initialState,
    reducers: {
        setCars(_state, action: PayloadAction<CarType[]>){
            return action.payload;
        },
        addCar(state, action: PayloadAction<CarType>){
            state.push(action.payload);
        },
        deleteCar(state, action: PayloadAction<string>){
            return state.filter(c => c.id !== action.payload);
        },
        updateCar(state, action: PayloadAction<CarType>){
            const index = state.findIndex(c => c.id === action.payload.id);
            if(index !== -1){
                state[index] = action.payload;
            }
        }
    }
})

export const {setCars, addCar, deleteCar, updateCar} = carReducer.actions;

export const initializeCars = () => {
    return async (dispatch: AppDispatch) => {
        const data = await fetchCarsAPI();
        dispatch(setCars(data));
    }
}

export default carReducer.reducer;