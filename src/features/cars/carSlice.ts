import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CarType } from "../../types";
import { addCarAPI, deleteCarAPI, fetchCarsAPI, updateCarAPI } from "./carApi";
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

export const createCar = (car :CarType) => {
    return async (dispatch: AppDispatch) => {
        const data = await addCarAPI(car);
        dispatch(addCar(data));
    }
}

export const delCar = (id: string) => {
    return async (dispatch: AppDispatch) => {
        await deleteCarAPI(id);
        dispatch(deleteCar(id));
    }
}

export const updCar = (car: CarType) => {
    return async (dispatch : AppDispatch) => {
        const data = await updateCarAPI(car);
        dispatch(updateCar(data));
    }
}

export default carReducer.reducer;