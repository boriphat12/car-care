import axios from 'axios';
import type { CarType, NewCarType } from '../../types';

const API_URL = 'http://localhost:3001/api/cars';

export const fetchCarsAPI = async () => {
    const response = await axios.get(API_URL)
    return response.data;
};

export const addCarAPI = async (car: NewCarType) => {
    const response = await axios.post(API_URL, car);
    return response.data;
};

export const deleteCarAPI = async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const updateCarAPI = async (car: CarType) => {
    const response = await axios.put(`${API_URL}/${car.id}`, car);
    return response.data
}