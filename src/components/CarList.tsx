import { useNavigate } from "react-router-dom";
import { delCar, updCar } from "../features/cars/carSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { CarType } from "../types";
import './css/CarList.css'
import { useState } from "react";

interface paramType {
    car: CarType,
    handleCancel: (id:string) => void,
    handleFinish: (car:CarType) => void,
    handlePickup: (id:string) => void;
}

const CarItem = ({car, handleCancel, handleFinish, handlePickup} : paramType ) => {
    const navigate = useNavigate();
    return (
        <div className={`car-card ${car.status}`}>
            <p>Owner:{car.owner}</p>
            <p>Color: {car.color}</p>
            <p>Plate: {car.licensePlate}</p>
            <p>Price: {car.price}</p>
            <ul>
                {car.services.map((s, index) => (
                <li key={index}>{s}</li>
            ))}
            </ul>
            
            <p>
                status: {car.status}
            </p>
            <div className="button-group">
                {car.status === "finish" ? (
                    <button onClick={() => (handlePickup(car.id))} className="pickup">
                        pick up
                    </button>
                ) : (
                    <button onClick={() => handleFinish(car)} className="finish">
                        finish
                    </button>
                )}
                <button onClick={() => navigate(`/edit/${car.id}`)} className="edit">edit</button>                
                <button onClick={() => handleCancel(car.id)} className="cancel">cancel</button>

            </div>
            
        </div>
    )
}

const CarList = () => {
    const cars = useAppSelector((state) => state.car);
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const handleCancel = (id: string) => {
        const isDelete = window.confirm("are you sure to cancel?");
        if(isDelete){
            dispatch(delCar(id))
        }
    }
    const handleFinish = (car: CarType) => {
        const isFinish = window.confirm("are you sure to finish?");
        if(isFinish){
            const updatedCar = {...car, status: 'finish'}
            dispatch(updCar(updatedCar))
        }
    }
    const handlePickup = (id: string) => {
        const isPickup = window.confirm("Has the customer picked up the car?");
        if(isPickup){
            dispatch(delCar(id));
        }
    }
    const showCars = cars.filter(car => 
    (selectedFilter === "all" || car.status === selectedFilter) && (
        car.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
        car.owner.toLowerCase().includes(search.toLowerCase()) ||
        car.color.toLowerCase().includes(search.toLowerCase())
     )
    );
    return(
        <div>
            <div className="search-container">
                <label>
                    <input 
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search}
                        type="text"
                        placeholder="Search by plate, owner, color..."
                    />
                </label>
            </div>
            <div className="filter-container">
                <label>
                    <input 
                        type="radio"
                        name="filter"
                        value="all"
                        checked={selectedFilter === "all"}
                        onChange={() => setSelectedFilter("all")}
                    />    
                    <span>All</span>
                </label>    
                <label>
                    <input 
                        type="radio"
                        name="filter"
                        value="finish"
                        checked={selectedFilter === "finish"}
                        onChange={() => setSelectedFilter("finish")}
                    />    
                    <span>Finish</span>
                </label>    
                <label>
                    <input 
                        type="radio"
                        name="filter"
                        value="pending"
                        checked={selectedFilter === "pending"}
                        onChange={() => setSelectedFilter("pending")}
                    />    
                    <span>Pending</span>
                </label>    
            </div>
            
            <div className="car-list">
                {showCars.map(car => 
                    <CarItem car={car} key={car.id} handleCancel={handleCancel} handleFinish={handleFinish} handlePickup={handlePickup}/>
                )}
            </div>
        </div>
        
    )
}

export default CarList