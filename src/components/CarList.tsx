import { Link } from "react-router-dom";
import { delCar } from "../features/cars/carSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { CarType } from "../types";

interface paramType {
    car: CarType,
    handleCancel: (id:string) => void;
}

const CarItem = ({car, handleCancel} : paramType ) => {
    console.log(car);
    return (
        <div>
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
                <button style={{marginLeft: "20px"}}>next</button>
                <Link to={`/edit/${car.id}`}>
                    <button style={{marginLeft: "20px"}}>edit</button>                

                </Link>
                <button onClick={() => handleCancel(car.id)} style={{marginLeft: "20px"}}>cancel</button>
            </p>
            
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
        <div>
            {cars.map(car => 
                <CarItem car={car} key={car.id} handleCancel={handleCancel}/>
            )}
        </div>
    )
}

export default CarList