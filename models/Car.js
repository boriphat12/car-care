import mongoose from "mongoose";

const carSchema = mongoose.Schema({
    id: {type: String},
    owner: {type: String, required: true},
    licensePlate: {type: String, required: true},
    color: {type:String, required: true},
    status: {type:String, required: true},
    price: {type:Number, required: true},
    services: {type: [String], required: true},
}, {timestamps: true})

carSchema.set('toJSON', {
    transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

export default mongoose.model("Car", carSchema);