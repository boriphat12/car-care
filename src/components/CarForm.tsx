import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks"
import { createCar, updCar } from "../features/cars/carSlice";
import { useNavigate, useParams } from "react-router-dom";
import './css/CarForm.css'

const CarForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const services = [
        { name: "Wash", price: 100 },
        { name: "Wax", price: 200 },
        { name: "Polish", price: 300 },
        { name: "Interior Cleaning", price: 400 }
    ];
    const existingCar = useAppSelector((state) => 
        state.car.find((c) => c.id === id)
    );
    const [owner, setOwner] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [color, setColor] = useState("");
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if(existingCar) {
            setOwner(existingCar.owner);
            setLicensePlate(existingCar.licensePlate);
            setColor(existingCar.color);
            setSelectedServices(existingCar.services || [])
            setTotalPrice(existingCar.price);
        }
    }, [existingCar])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCar = {owner, licensePlate, color, price: Number(totalPrice), status: "pending", services: selectedServices};
        console.log(newCar);
        if(id) {
            dispatch(updCar({...newCar, id}));
        } else {
            dispatch(createCar(newCar));
        }
        navigate("/")
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Owner name: </label>
                <input value={owner} onChange={(e) => setOwner(e.target.value)} required/>
            </p>
            <p>
                <label>License plate: </label>
                <input value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required/>
            </p>
            <p>
                <label>Color: </label>
                <input value={color} onChange={(e) => setColor(e.target.value)} required/>
            </p>
            <fieldset>
                <legend>Car Care Services</legend>
                {services.map(service => (
                    <div key={service.name}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedServices.includes(service.name)}
                                onChange={(e) => {
                                    let updated: string[];
                                    if (e.target.checked) {
                                        updated = [...selectedServices, service.name];
                                    } else {
                                        updated = selectedServices.filter(s => s !== service.name);
                                    }
                                    setSelectedServices(updated);

                                    const newPrice = updated.reduce((sum, sName) => {
                                        const s = services.find(x => x.name === sName);
                                        return s ? sum + s.price : sum;
                                    }, 0);
                                    setTotalPrice(newPrice);
                                }}
                            />
                            {service.name} (${service.price})
                        </label>
                    </div>
                ))}
        </fieldset>
            <p>
                <strong>Total Price:</strong> ${totalPrice}
            </p>
            <button type="submit">confirm</button>
            <button  type="button" onClick={() => navigate("/")}>cancel</button>

        </form>
    )
}

export default CarForm;