import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { delCar, updCar } from "../features/cars/carSlice";
import type { CarType } from "../types";
import CarForm from "./CarForm";
import "./css/CarList.css";

interface CarItemProps {
    car: CarType;
    handleCancel: (id: string) => void;
    handleFinish: (car: CarType) => void;
    handlePickup: (id: string) => void;
    openEditModal: (car: CarType) => void;
}

const CarItem = ({
    car,
    handleCancel,
    handleFinish,
    handlePickup,
    openEditModal
}: CarItemProps) => {
    return (
        <div className={`car-card ${car.status}`}>
            <p><strong>Owner:</strong> {car.owner}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Plate:</strong> {car.licensePlate}</p>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Status:</strong> {car.status}</p>
            <ul>
                {car.services.map((s, index) => (
                    <li key={index}>{s}</li>
                ))}
            </ul>
            <div className="button-group">
                {car.status === "finish" ? (
                    <button
                        onClick={() => handlePickup(car.id)}
                        className="pickup"
                    >
                        Pick Up
                    </button>
                ) : (
                    <button
                        onClick={() => handleFinish(car)}
                        className="finish"
                    >
                        Finish
                    </button>
                )}
                <button
                    onClick={() => openEditModal(car)}
                    className="edit"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleCancel(car.id)}
                    className="cancel"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

const CarList = () => {
    const cars = useAppSelector((state) => state.car);
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalCar, setModalCar] = useState<CarType | null>(null);

    const openAddModal = () => {
        setModalCar(null); // new car
        setShowModal(true);
    };

    const openEditModal = (car: CarType) => {
        setModalCar(car); // existing car
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalCar(null);
    };

    const handleCancel = (id: string) => {
        const isDelete = window.confirm("Are you sure to cancel?");
        if (isDelete) {
            dispatch(delCar(id));
        }
    };

    const handleFinish = (car: CarType) => {
        const isFinish = window.confirm("Are you sure to finish?");
        if (isFinish) {
            const updatedCar = { ...car, status: "finish" };
            dispatch(updCar(updatedCar));
        }
    };

    const handlePickup = (id: string) => {
        const isPickup = window.confirm("Has the customer picked up the car?");
        if (isPickup) {
            dispatch(delCar(id));
        }
    };

    const showCars = cars.filter(
        (car) =>
            (selectedFilter === "all" || car.status === selectedFilter) &&
            (car.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
                car.owner.toLowerCase().includes(search.toLowerCase()) ||
                car.color.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            {/* Search and Filter */}
            <div className="search-container">
                <label>
                    Search:
                    <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        placeholder="Owner, Plate or Color"
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

            {/* Car List */}
            <div className="car-list">
                {showCars.map((car) => (
                    <CarItem
                        car={car}
                        key={car.id}
                        handleCancel={handleCancel}
                        handleFinish={handleFinish}
                        handlePickup={handlePickup}
                        openEditModal={openEditModal}
                    />
                ))}
            </div>


            {/* Modal */}
            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CarForm
                            onClose={closeModal}
                            editingCar={modalCar || undefined}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarList;
