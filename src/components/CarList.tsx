import { useNavigate } from "react-router-dom";
import { delCar } from "../features/cars/carSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { CarType } from "../types";
import './css/CarList.css'

interface paramType {
    car: CarType,
    handleCancel: (id:string) => void;
}

const CarItem = ({car, handleCancel} : paramType ) => {
    console.log(car);
    const navigate = useNavigate();
    return (
        <div className="car-card">
            <p>Car's owner: {car.owner}</p>
            <p>Car's color: {car.color}</p>
            <p>License plate: {car.licensePlate}</p>
            <p>Price: {car.price}</p>
            <ul>
                {car.services.map((s, index) => (
                <li key={index}>{s}</li>
            ))}
            </ul>
            
            <p>
                Car's status: {car.status}
            </p>
            <div className="button-group">
                <button>next</button>
                <button onClick={() => navigate(`/edit/${car.id}`)} className="edit">edit</button>                
                <button onClick={() => handleCancel(car.id)} className="cancel">cancel</button>

            </div>
            
        </div>
    )
}

const CarList = () => {
    const cars = useAppSelector((state) => state.car);
    const dispatch = useAppDispatch();
    const handleCancel = (id: string) => {
        const isDelete = window.confirm("are you sure to cancel?");
        if(isDelete){
            dispatch(delCar(id))
        }
    }
    return(
        <div className="car-list">
            {cars.map(car => 
                <CarItem car={car} key={car.id} handleCancel={handleCancel}/>
            )}
        </div>
    )
}

export default CarList