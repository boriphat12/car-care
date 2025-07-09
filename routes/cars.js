import express from 'express';
import Car from '../models/Car.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try{
        const cars = await Car.find({});
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get("/:id", async (req, res) => {
    try{
        const car = await Car.findById(req.params.id);
        if(!car){
            res.status(404).json({message: "Car not found"});
            return;
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.post('/', async (req, res) => {
    const {owner, licensePlate, color, status, price} = req.body;
    const car = new Car({owner, licensePlate, color, status, price});
    try{
        
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {owner, licensePlate, color, status, price} = req.body;
        const updatedCar = await Car.findByIdAndUpdate(id, {
            owner, licensePlate, color, status, price
        }, {new: true});
        if(!updatedCar) {
            res.status(404).json({message: "Car not found"});
            return;
        }
        res.status(201).json(updatedCar);        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedCar = await Car.findByIdAndDelete(id);
        if(!deletedCar) {
            res.status(404).json({message: "error on delete"});
            return;
        }
        res.status(200).json(deletedCar);

    } catch (error){
        res.status(400).json({message: error.message});
    }
})
export default router;