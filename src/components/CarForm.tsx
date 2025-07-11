import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { createCar, updCar } from "../features/cars/carSlice";
import type { CarType } from "../types";
import "./css/CarForm.css";

interface CarFormProps {
    onClose: () => void;
    editingCar?: CarType; // optional for edit mode
}

const CarForm = ({ onClose, editingCar }: CarFormProps) => {
    const dispatch = useAppDispatch();

    const services = [
        { name: "Wash", price: 100 },
        { name: "Wax", price: 200 },
        { name: "Polish", price: 300 },
        { name: "Interior Cleaning", price: 400 }
    ];

    const [owner, setOwner] = useState(editingCar?.owner || "");
    const [licensePlate, setLicensePlate] = useState(editingCar?.licensePlate || "");
    const [color, setColor] = useState(editingCar?.color || "");
    const [selectedServices, setSelectedServices] = useState<string[]>(editingCar?.services || []);
    const [totalPrice, setTotalPrice] = useState(editingCar?.price || 0);

    useEffect(() => {
        // update total price whenever services change
        const newPrice = selectedServices.reduce((sum, sName) => {
            const service = services.find(x => x.name === sName);
            return service ? sum + service.price : sum;
        }, 0);
        setTotalPrice(newPrice);
    }, [selectedServices]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCar: CarType = {
            id: editingCar?.id || crypto.randomUUID(), // keep id for edit
            owner,
            licensePlate,
            color,
            price: totalPrice,
            status: editingCar ? editingCar.status : "pending",
            services: selectedServices
        };

        if (editingCar) {
            dispatch(updCar(newCar));
        } else {
            dispatch(createCar(newCar));
        }

        onClose();
    };

    return (
        <div className="carform-container">
            <form onSubmit={handleSubmit} className="carform">
                <h2>{editingCar ? "Edit Car" : "Add New Car"}</h2>
                <p>
                    <label>Owner name: </label>
                    <input
                        type="text"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        required
                        placeholder="Enter owner's name"
                    />
                </p>
                <p>
                    <label>License plate: </label>
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                        placeholder="Enter license plate"
                    />
                </p>
                <p>
                    <label>Color: </label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                        placeholder="Enter car color"
                    />
                </p>
                <fieldset>
                    <legend>Car Care Services</legend>
                    {services.map(service => (
                        <div key={service.name} className="service-option">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedServices.includes(service.name)}
                                    onChange={(e) => {
                                        const updated = e.target.checked
                                            ? [...selectedServices, service.name]
                                            : selectedServices.filter(s => s !== service.name);
                                        setSelectedServices(updated);
                                    }}
                                />
                                {service.name} (${service.price})
                            </label>
                        </div>
                    ))}
                </fieldset>
                <p className="total-price">
                    <strong>Total Price:</strong> ${totalPrice}
                </p>
                <div className="form-buttons">
                    <button type="submit" className="confirm-btn">
                        {editingCar ? "Update" : "Confirm"}
                    </button>
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CarForm;
