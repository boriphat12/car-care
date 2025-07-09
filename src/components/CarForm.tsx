import { useState } from "react";
import { useAppDispatch } from "../hooks"
import { createCar } from "../features/cars/carSlice";

const CarForm = () => {
    const dispatch = useAppDispatch();
    const [owner, setOwner] = useState("");
    const [licensePlate, setLicensePlate] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCar = {owner, licensePlate, color, price: Number(price), status: "pending"};
        dispatch(createCar(newCar));
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label>Owner name: </label>
                <input value={owner} onChange={(e) => setOwner(e.target.value)}/>
            </p>
            <p>
                <label>License plate: </label>
                <input value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)}/>
            </p>
            <p>
                <label>Color: </label>
                <input value={color} onChange={(e) => setColor(e.target.value)}/>
            </p>
             <p>
                <label>Price: </label>
                <input value={price} onChange={(e) => setPrice(e.target.value)}/>
            </p>
            <button type="submit">add</button>

        </form>
    )
}

export default CarForm;