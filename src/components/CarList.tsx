import { useAppSelector } from "../hooks";
import type { CarType } from "../types";

const CarItem = ({car} : {car: CarType}) => {
    return (
        <div>
            <h3>Car owner: {car.owner}</h3>
            <h4>License plate: {car.licensePlate}</h4>
        </div>
    )
}

const CarList = () => {
    const cars = useAppSelector((state) => state.car);
    return(
        <div>
            {cars.map(car => 
                <CarItem car={car} key={car.owner}/>
            )}
        </div>
    )
}

export default CarList