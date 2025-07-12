import { useAppSelector } from "../hooks";
import './css/FinishedCars.css';
import imgCar from '../image/car.png'
import { useState } from "react";

const FinishedCars = () => {
    const cars = useAppSelector((state) => state.car);
    const [search, setSearch] = useState('')
    const finishedCars = cars.filter(car => car.status === "finish" &&
        car.licensePlate.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="finished-cars">
            <h1>Finished Cars</h1>
            <p>Check out some of the cars we’ve recently serviced!</p>
            <input 
                placeholder="Search by license plate..."
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
            />
            <div className="car-grid">
                {finishedCars.map((car) => (
                    <div className="car-card" key={car.id}>
                        <img
                        src={imgCar}
                        alt="Car"
                        className="car-image"
                        />
                        <div className="car-details">
                            <p><strong>Plate:</strong> {car.licensePlate}</p>
                            <p><strong>Color:</strong> {car.color}</p>
                            <p><strong>Services:</strong></p>
                            <ul>
                                {car.services.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="status-badge">Finished</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinishedCars;
