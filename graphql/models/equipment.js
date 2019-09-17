import { Schema, model } from 'mongoose'

const EquipmentSchema = Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    cost: {
        type: Number,
        required: true,
        trim: true
    }
})

export default model('Equipment', EquipmentSchema)